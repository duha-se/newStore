import {Component} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { Ma3zoomService } from '../ma3zoom.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {
  public selectedLang;
  constructor(public translate: TranslateService, private service: Ma3zoomService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang(localStorage.getItem('lang') ?? 'ar');
    translate.use(localStorage.getItem('lang') ?? 'ar');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    service.setLanguage(event.lang);
    });
    this.selectedLang = (service.getLanguage() === 'ar') ? 'عربي' : 'English';
    translate.setTranslation('en', {
      TITLE: 'Ma3zoom',
      SELECT: 'Change language',
      HELLO: 'hello {{value}}',
      Home: 'Home',
      Restaurants: 'Restaurants',
      Donate: 'Donate',
      Impact: 'Impact',
      Cart: 'Cart',
      'Browse a Resturant': 'Browse a Resturant',
      Login: 'Login',
      Register: 'Register',
      'View Meals': 'View Meals',
      GOOGLE_LOGIN: 'Login With Google',
      FB_LOGIN: 'login with Facebook',
      Delete: 'Delete',
      Meals: 'Meals',
      Meals_Cart: 'Meals Cart',
      Destinations: 'Destinations',
      Order_Distribution: 'Order Distribution',
      Payment: 'Payment',
      Continue: 'Continue',
      Back: 'Back',
      Submit_Order: 'Submit Order',
      NIS: 'NIS',
      Overall_Price: 'Overall Price',
      Price: 'Price',
      Qty: 'Qty',
      TOTAL: 'TOTAL',
      Delivery_Cost: 'Delivery Cost',
      Subtotal: 'Subtotal',
      Add_Destination: 'Add Destination',
      Add_new_destination: 'Add new destination',
      Destination_Name: 'Destination Name',
      Contact_Name: 'Contact Name',
      Select_city: 'Select City',
      Select_neighbourhood: 'Select Neighbourhood',
      Street_Address: 'Street Address',
      Tel: 'tel',
      Email: 'Email',
      No_Meals: 'No meals chosen',
      click_here: 'click here',
      Restaurant_List: 'for restaurant list',
      Login_with: 'Login with',
      Add_Cart: 'Add to Cart'
    });

    translate.setTranslation('ar', {
      TITLE: 'معزووم',
      SELECT: 'تغيير اللغة',
      HELLO: 'مرحبا {{value}}',
      Home: 'الرئيسية',
      Restaurants: 'مطاعم',
      Donate: 'تبرع',
      Impact: 'تأثير',
      Cart: 'العربة',
      'Browse a Resturant': 'اختر مطعما',
      Login: 'دخول',
      Register: 'تسجيل',
      'View Meals': 'استعراض الوجبات',
      GOOGLE_LOGIN: 'تسجيل الدخول عبر جوجل',
      FB_LOGIN: 'تسجيل الدخول عبر الفيسبوك',
      Delete: 'احذف',
      Meals: 'الوجبات',
      Meals_Cart: 'صندوق الوجبات',
      Destinations: 'المعازيم',
      Order_Distribution: 'توزيع الوجبات',
      Payment: 'الدفع',
      Continue: 'اكمل',
      Back: 'للخلف',
      Submit_Order: 'ارسال الطلب',
      NIS: 'شيكل',
      Overall_Price: 'مجموع السعر',
      Price: 'السعر',
      Qty: 'الكمية',
      TOTAL: 'المجموع',
      Delivery_Cost: 'سعر الارسالية',
      Subtotal: 'سبتوتال',
      Add_Destination: 'اضف معزوم',
      Add_new_destination: 'ضف معزوم جديد',
      Destination_Name: 'المعازيم',
      Contact_Name: 'اسم للتواصل',
      Select_city: 'اختر بلد',
      Select_neighbourhood: 'اختر حارة',
      Street_Address: 'عنوان الشارع',
      Tel: 'تلفون',
      Email: 'بريد الكتروني',
      No_Meals: 'سلتك فارغة',
      click_here: 'اضغط هنا',
      Restaurant_List: 'لقائمة المطاعم',
      Login_with: 'الدخول بواسطة',
      Add_Cart: 'اضافة للعربة'
    });
  }

  public setLang(lang): void {
    this.translate.use(lang);
    this.service.setLanguage(lang);
    this.selectedLang = (lang === 'ar') ? 'عربي' : 'English';
    location.reload();
  }
}
