import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, phone, car, type } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hayhayhatt5@gmail.com",
      pass: "fcvl teou hjap ideh", 
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Xe" <sendmail.hongocly.misubishi@gmail.com>`,
      to: " hongocly240897@gmail.com",
      subject: "Khách đăng ký tư vấn xe",
      html: `
        <h2>Thông tin khách hàng</h2>
        <p><b>Họ tên:</b> ${name}</p>
        <p><b>SĐT:</b> ${phone}</p>
        <p><b>Xe:</b> ${car}</p>
        <p><b>Hình thức:</b> ${type}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false });
  }
}