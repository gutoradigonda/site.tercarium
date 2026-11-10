import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });
    }

    // 1. Busca a promoção e o cupom ativo atualmente
    const { data: config } = await supabase
      .from('site_banner_promocao')
      .select('ativo, codigo_cupom')
      .eq('id', 1)
      .single();

    if (!config?.ativo) {
      return NextResponse.json({ error: 'Promoção temporariamente indisponível.' }, { status: 400 });
    }

    const cupomAtivo = config.codigo_cupom || 'BEMVINDO10';

    // 2. Salva o Lead (se já existir, apenas atualiza)
    const { error: dbError } = await supabase
      .from('leads_newsletter')
      .upsert(
        { email: email.toLowerCase().trim(), cupom_enviado: cupomAtivo },
        { onConflict: 'email' }
      );

    if (dbError) throw dbError;

    // 3. Aqui você pode disparar o envio via Resend / SendGrid / NodeMailer:
    // await resend.emails.send({ to: email, subject: 'Seu cupom Terçarium chegou!', html: `Use: ${cupomAtivo}` });

    return NextResponse.json({ 
      success: true, 
      cupom: cupomAtivo,
      message: 'E-mail cadastrado com sucesso!' 
    });
  } catch (error: any) {
    console.error('Erro ao cadastrar newsletter:', error);
    return NextResponse.json({ error: 'Falha ao salvar e-mail.' }, { status: 500 });
  }
}