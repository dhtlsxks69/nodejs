/*const a = false;
if (a) {
    import '../2_ECMAScript/func.mjs';
}
console.log('성공');*/

const a = true;
if (a) {
    const m1 = await import('../2_ECMAScript/func.mjs');
    console.log(m1);
    const m2 = await import('../2_ECMAScript/var.mjs');
    console.log(m2);
}