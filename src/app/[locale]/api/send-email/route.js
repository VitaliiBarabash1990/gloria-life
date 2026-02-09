import nodemailer from "nodemailer";

export async function POST(req) {
	const { name, phone } = await req.json();

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	try {
		await transporter.sendMail({
			from: process.env.SMTP_FROM,
			to: process.env.SMTP_TO,
			subject: `Повідомлення від ${name}`,
			text: `Ім'я: ${name}\nТелефон: ${phone}`,
			html: `
        <p><strong>Ім'я:</strong> ${name}</p>
				<p><strong>Телефон:</strong> ${phone}</p>
      `,
		});

		return Response.json(
			{ message: "Email sent successfully!" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return Response.json({ message: "Error sending email" }, { status: 500 });
	}
}
