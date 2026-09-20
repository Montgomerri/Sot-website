import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email, name } = await req.json();

  try {
    await resend.emails.send({
      from: "GIMPA Department <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to the Department Platform 👋",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Welcome, ${name || "Student"} 🎉</h2>
          <p>Your account has been created successfully.</p>
          <p>You can now log in and start using the platform.</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}