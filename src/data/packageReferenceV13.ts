/** NmoLabs V1.3 — internal reference mapping based on the V1.2.1 catalog.
 * Only the ecommerce-new growth package has an explicitly approved V1.3 price.
 * NML-WEB-001 (SAR 2500) has an approved standalone service price; other references need approval.
 * Package scopes changed in V1.3; rates below require a new management approval
 * before they may be presented as binding sales prices in production.
 */
export const packageReferenceV13 = {
  ecommerce: {
    new: [
      {amount:1500,source:'NML-ECM-013',approved:false,explanation:'سعر خدمة إنشاء المتجر الأساسي السابقة؛ نطاق V1.3 أوسع'},
      {amount:4000,source:'اعتماد المستخدم 2026-11-11',approved:true,explanation:'باقة الإطلاق والنمو لإنشاء متجر جديد — 4,000 ريال قبل الضريبة، 4,600 شامل الضريبة، ميزانية الإعلانات منفصلة'},
    ],
    existing: [
      {amount:1500,source:'NML-ECM-016',approved:false,explanation:'مرجع إعادة هيكلة متجر سابق، ويحتاج مطابقة نطاق V1.3'},
      {amount:5100,source:'NML-ECM-016 (1500) + PKG-ANL-01 (1600) + NML-ADS-058 (2000)',approved:false,explanation:'جمع أسعار مرجعية تقديرية؛ يحتاج تسعير بنود الباقة الجديدة دون ازدواج'},
    ],
  },
  websites: {
    new: [
      {amount:2500,source:'NML-WEB-001',approved:false,explanation:'سعر الخدمة المرجعية معتمد، لكن نطاق باقة V1.3 الجديدة لم يُعتمد سعريًا'},
      {amount:6100,source:'NML-WEB-001 (2500) + PKG-ANL-01 (1600) + NML-ADS-058 (2000)',approved:false,explanation:'جمع أسعار مرجعية تقديرية؛ نطاق الباقة الجديدة يتطلب مراجعة وتسعير'},
    ],
    existing: [
      {amount:1500,source:'NML-WEB-009',approved:false,explanation:'سعر إعادة التصميم السابق؛ باقة V1.3 تتضمن أعمالًا إضافية'},
      {amount:5100,source:'NML-WEB-009 (1500) + PKG-ANL-01 (1600) + NML-ADS-058 (2000)',approved:false,explanation:'جمع أسعار مرجعية تقديرية وليس باقة معتمدة'},
    ],
  },
} as const;
