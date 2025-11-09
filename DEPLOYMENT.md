# دليل نشر المشروع على الاستضافة

هذا الدليل يوضح كيفية رفع المشروع على مختلف منصات الاستضافة.

## المتطلبات الأساسية

1. **Node.js** (الإصدار 18 أو أحدث)
2. **Git** مثبت على جهازك
3. حساب على منصة الاستضافة المختارة

---

## الطريقة 1: النشر على GitHub Pages (موصى به)

### الخطوات:

1. **تثبيت المتطلبات:**
```bash
npm install
```

2. **بناء المشروع:**
```bash
npm run build
```

3. **النشر التلقائي:**
```bash
npm run deploy
```

**ملاحظة:** تأكد من:
- أن المستودع موجود على GitHub
- أن اسم المستودع هو `twfikcom`
- أن لديك صلاحيات الكتابة على المستودع
- أن `gh-pages` مثبت كـ dev dependency

### إعداد GitHub Pages يدوياً:

1. اذهب إلى إعدادات المستودع على GitHub
2. اختر **Pages** من القائمة الجانبية
3. في **Source**، اختر **gh-pages branch**
4. احفظ التغييرات

الموقع سيكون متاحاً على: `https://[username].github.io/twfikcom`

---

## الطريقة 2: النشر على Netlify

### الخطوات:

1. **بناء المشروع محلياً:**
```bash
npm run build
```

2. **رفع مجلد `dist` على Netlify:**
   - سجل دخول إلى [Netlify](https://www.netlify.com)
   - اسحب وأفلت مجلد `dist` على Netlify
   - أو استخدم Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **إعداد Base Path:**
   - في إعدادات الموقع على Netlify
   - أضف متغير بيئة: `VITE_BASE_PATH=/`
   - أو عدّل `vite.config.ts` ليكون `base: '/'`

---

## الطريقة 3: النشر على Vercel

### الخطوات:

1. **تثبيت Vercel CLI:**
```bash
npm install -g vercel
```

2. **النشر:**
```bash
vercel
```

3. **إعداد Base Path:**
   - عدّل `vite.config.ts` ليكون `base: '/'`
   - أو استخدم إعدادات Vercel لتعديل base path

---

## الطريقة 4: النشر على استضافة تقليدية (cPanel/FTP)

### الخطوات:

1. **بناء المشروع:**
```bash
npm run build
```

2. **تعديل Base Path:**
   - افتح `vite.config.ts`
   - غيّر `base: '/twfikcom/'` إلى `base: '/'`

3. **رفع الملفات:**
   - ارفع محتويات مجلد `dist` إلى مجلد `public_html` أو `www` على الاستضافة
   - تأكد من رفع ملف `.htaccess` (انظر أدناه)

4. **إنشاء ملف `.htaccess`** في مجلد `dist`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## تعديل إعدادات Base Path

حسب نوع الاستضافة، قد تحتاج لتعديل `base` في `vite.config.ts`:

- **GitHub Pages (subdirectory):** `base: '/twfikcom/'`
- **GitHub Pages (custom domain):** `base: '/'`
- **Netlify/Vercel:** `base: '/'`
- **استضافة تقليدية:** `base: '/'`

---

## استكشاف الأخطاء

### المشكلة: الصور والملفات الثابتة لا تظهر
**الحل:** تأكد من أن `base` في `vite.config.ts` يطابق مسار الموقع

### المشكلة: الصفحات لا تعمل عند تحديث الصفحة
**الحل:** أضف ملف `.htaccess` (لـ Apache) أو إعدادات مشابهة لـ Nginx

### المشكلة: الأخطاء في Console
**الحل:** 
- تأكد من بناء المشروع بشكل صحيح: `npm run build`
- تحقق من أن جميع المسارات صحيحة
- تأكد من أن ملفات الترجمة موجودة في `public/locales`

---

## نصائح إضافية

1. **اختبار البناء محلياً:**
```bash
npm run build
npm run preview
```

2. **تحسين الأداء:**
   - تأكد من تفعيل ضغط Gzip على الاستضافة
   - استخدم CDN للملفات الثابتة

3. **SEO:**
   - تأكد من أن جميع ملفات الترجمة موجودة
   - تحقق من أن meta tags تعمل بشكل صحيح

---

## الدعم

إذا واجهت أي مشاكل، تحقق من:
- ملف `package.json` للتأكد من أن جميع السكريبتات صحيحة
- ملف `vite.config.ts` للتأكد من إعدادات base path
- ملف `.gitignore` للتأكد من عدم رفع ملفات غير ضرورية

