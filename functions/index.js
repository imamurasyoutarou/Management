const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const gmailEmail = "syoutarouimamura@gmail.com";
const gmailPassword = "Imasyou718";
const adminEmail = "syoutarouimamura@gmail.com";

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 管理者用のメールテンプレート
const adminContents = (data) => {
  return `以下内容でホームページよりお問い合わせを受けました。
お名前：
${data.name}
メールアドレス：
${data.email}
年齢
${data.age}
希望職種 
${data.job}
希望理由：
${data.reason}
`;
};

exports.sendMail = functions.https.onCall(async (data, context) => {
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: "ホームページお問い合わせ",
    text: adminContents(data),
  };

  // 管理者へのメール送信
  try {
    await mailTransport.sendMail(adminMail);
  } catch (e) {
    console.error(`send failed. ${e}`);
    throw new functions.https.HttpsError("internal", "send failed");
  }
});
