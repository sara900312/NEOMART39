export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // حاول جلب الملف المطلوب أولاً
    let response = await env.ASSETS.fetch(request);

    // إذا الملف موجود، أرسله كما هو
    if (response.status !== 404) {
      return response;
    }

    // إذا كان الرابط داخل beauty ولم يجد ملفاً، أرسل beauty/index.html
    if (url.pathname.startsWith("/beauty/")) {
      return env.ASSETS.fetch(new Request(new URL("/beauty/index.html", request.url)));
    }

    // أي رابط آخر يرجع الصفحة الرئيسية
    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
  },
};