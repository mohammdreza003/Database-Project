// frontend/js/main.js

// اینجا تابع initAdminDashboard رو از فایل adminDashboard.js ایمپورت می‌کنی
// مسیر فایل باید دقیق باشه و شامل .js باشه
import { initAdminDashboard } from './pages/adminDashboard.js';

// منتظر می‌مونیم تا تمام عناصر HTML صفحه بارگذاری بشن
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. Initializing Admin Dashboard...');
    
    // اینجا تابع initAdminDashboard رو فراخوانی می‌کنی
    initAdminDashboard(); 
    
    console.log('Admin Dashboard initialization process started.');
});