import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, number, message } = await request.json();
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    console.log('webhookUrl', webhookUrl);
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL tidak ditemukan' }, { status: 500 });
    }

    console.log('name', name);
    console.log('email', email);
    console.log('message', message);

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📩 Pesan Baru dari Website\n\n**Nama:** ${name}\n**Phone:** ${number}\n**Email:** ${email}\n**Pesan:** ${message}`,
      }),
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal kirim ke Discord' }, { status: 500 });
  }
}
