
(function($)  {
   "use strict";
   
    /**
     * ------------- LOADER --------------------
     */
     var loader = function () {
      setTimeout(function () {
         if ($("#elyx-loader").length > 0) {
            $("#elyx-loader").removeClass("show");
         }
      }, 500);
   };
   loader();

   /**
    * ----------------- ANIMATION ON RELOAD -----------------
    */
   var contentWayPoint = function () {
      var i = 0;
      $(".elyx-animate").waypoint(
         function (direction) {
            if (direction === "down" && !$(this.element).hasClass("ftco-animated")) {
               i++;

               $(this.element).addClass("item-animate");
               setTimeout(function () {
                  $("body .elyx-animate.item-animate").each(function (k) {
                     var el = $(this);
                     setTimeout(
                        function () {
                           var effect = el.data("animate-effect");
                           if (effect === "fadeIn") {
                              el.addClass("fadeIn ftco-animated");
                           } else if (effect === "fadeInLeft") {
                              el.addClass("fadeInLeft ftco-animated");
                           } else if (effect === "fadeInRight") {
                              el.addClass("fadeInRight ftco-animated");
                           } else {
                              el.addClass("fadeInUp ftco-animated");
                           }
                           el.removeClass("item-animate");
                        },
                        k * 50,
                        "easeInOutExpo"
                     );
                  });
               }, 500); 
            }
         },
         { offset: "95%" }
      );
   };
   contentWayPoint();

/**
 * The trick to viewport units on mobile (css include utilities.scss)
 */
   // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
   let vh = window.innerHeight * 0.01;
   // Then we set the value in the --vh custom property to the root of the document
   document.documentElement.style.setProperty('--vh', `${vh}px`);

   // We listen to the resize event
   window.addEventListener('resize', () => {
      // Update the element's size
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
   });

/**
 * ------------------ COUNTDOWN ---------------------
 */
   const sec = 1000,
     min = sec * 60,
     hour = min * 60,
     day = hour * 24;  
   const end = new Date("Dec 31, 2021 12:00:00").getTime();

   //fetch the current time every 1000 milliseconds.
   const int = setInterval(() => {
      const current = new Date().getTime();
      const remaining = end - current;
      const days = document.getElementById("days");
      const hours = document.getElementById("hours")
      const seconds = document.getElementById("seconds")
      const minutes = document.getElementById("minutes")

      if(days && hours && seconds && minutes) {
         days.innerText = Math.floor(remaining / day);
         hours.innerText = Math.floor( (remaining % day) / hour );
         minutes.innerText = Math.floor( (remaining % hour) / min );
         seconds.innerText = Math.floor( (remaining % min) / sec );   
      }

       //update the text to indicate the end date has been reached. 
      if (remaining < 0) {
         const titleEn = document.querySelector("#coming-body-en .coming__heading");
         const titleTxtEn = document.querySelector("#coming-body-en .coming__text");
         const titleAz = document.querySelector("#coming-body-az .coming__heading");
         const titleTxtAz = document.querySelector("#coming-body-az .coming__text");
         const subtitle = document.querySelector('.coming-body .heading__subtitle');

         if(subtitle) subtitle.style.display = "none";

         if(titleEn && titleTxtEn) {
            titleEn.innerText = "We Have Arrived!";
            titleTxtEn.innerHTML = 'The big day is finally here - view our <a href="https://www.elyx.app">website<a/>.'
         }
         if(titleAz && titleTxtAz) {
            titleAz.innerText = "Gəldik!";
            titleTxtAz.innerHTML = 'Böyük gün gəlib çatdı - <a href="https://www.elyx.app">Saytımızı<a/> ziyarət edin.'
         }

         //coundown numbers
         const digit = document.querySelectorAll(".coming-body h4");
            digit.forEach((d) => {
               d.innerText = "0";

         });
         clearInterval(int);
      }
    }, 0);

    /**
    * -------------------- REDIRECT ON MOBILE VIEW ---------------
    */

     $('#closeRedirect').on('click', function() {
      $(this).parents('.redirect').hide();
   })

   /**
    * ------------------- SMOOTH SCROLL --------------------
    */
   // Add smooth scrolling to all links
   $('li a, .back-to-top').on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
         event.preventDefault();

         // Store hash
         var hash = this.hash;

         // Using jQuery's animate() method to add smooth page scroll
         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
         });
      } // End if
   });
    
   /**
    *---------------------- ONCLICK OUTSIDE ELEMENT --------------------
    */

   $(document).mouseup(function (e) {
      //Hide language dropdown when clicking outside
      if($(e.target).closest('.langtitle').length === 0 && 
         $(e.target).closest('.langlist').length === 0
         ) {
         $('.langlist').hide();
         $('.langtitle').removeClass('opened-lang')
      }
      
      let inputSearch = $('.header-nav__searchicon').parent().find('.main-input__field');
      if (!inputSearch.is(e.target) && inputSearch.has(e.target).length === 0 && inputSearch.val() == "") {
         $('.animate-to-left').parent().removeClass('animate-to-left-parent');
         inputSearch.parents('.main-input').removeClass('animate-to-left');

         //Show blogs if search input is empty
         $('.header-nav__searchicon').parents('.blog').find('.blog__inner').show();
         //Hide error message
         $('.search-error-msg').hide()
      }

   });

   // ADD CLASS TO BODY WHEN CLICK THE MENU BUTTON ON MOBILE 
   $('.navbar-toggler').click(function() {
      $('html').toggleClass('js-side-menu-open');
   });

   // CLOSE SIDE MENU
   $('#closeIcon').click(function() {
      $('html').removeClass('js-side-menu-open');
   });

    /**
     *------------------- BOOTSTRAP NAVBAR COLLAPSE ---------------
     */
    const navCollapse = $('.js_nav_collapse')
    const hamburger = $('.navbar-toggler .icon-menu');
    const close = $('.navbar-toggler .icon-close');

   //  Event fires when navbar collapsed 
    navCollapse.on('show.bs.collapse', function () {
      $(this).parent().addClass('js_navbar_absolute');//absolute navbar
      hamburger.addClass('d-none') //disable hamburger icon
      close.removeClass('d-none') //disable hamburger icon
      close.addClass('white');

    })

    navCollapse.on('hide.bs.collapse', function () {
      $(this).parent().removeClass('js_navbar_absolute');
      hamburger.removeClass('d-none') //disable hamburger icon
      close.addClass('d-none') //disable hamburger icon

      //  hamburger.addClass('white');
    })

    /**
     * ---------------------- INTRO CAROUSEL -------------------
     */
    var owlIntro = $('.intro-carousel-sm');

    owlIntro.owlCarousel({
      autoplay: false,
      // margin: 24,
      stagePadding: 0,
      nav: false,
      dots: true,
      loop: true, 
      items: 1,
      responsive: {
         779: {
            items:2
         }
      }
    });

    //Event fires when slide change
    owlIntro.on('changed.owl.carousel', function(e) {
      // Trigger method goes here 
      $(this).parents('.intro-wrapper-sm')
               .find('.frame__pane__img img')
               .attr('src',
                     `images/frame/intro/phone-frame-elyxsvg${e.page.index}.svg`)
  })

    /**
     *------------------  DRIVER PAGE CAROUSEL-----------------
     */
    $('.testimonial-carousel').owlCarousel({
      autoplay: false,
      margin: 50,
      stagePadding: 0,
      nav: false,
      dots: true,
      loop: true, 
      items: 1,
      //Custom owl dot with avatar
      onInitialized: function(e) {
         $(e.target).find('.owl-dots .owl-dot').each(function(i,el){
            $(this).find('span').html(`<img src="images/driver/testimonial/testimonial${i+1}.svg" class="d-block" alt="Avatar">`) //testimonial1.svg,testimonial2.svg,testimonial3.svg
         })
      }
    });

    /**
     * --------------- FAQ ACCORDION -------------------------
     */
    $(document).on("click",'.faq .accordion-header', function () {
       const $t = $(this);
       
      const parentAccItem = $t.parents('.accordion-item');

      let trg = parentAccItem.attr("data-trig");
      let accItem = $t.parents('.accordion').find('.accordion-item');
      let accBtn = $t.parents('.accordion').find('.accordion-button');
      

      accBtn.removeClass('bg-primary-light');
       if (trg == 0) {
         accItem.attr("data-trig",'0');
         parentAccItem.attr("data-trig",'1');
         parentAccItem.addClass('bg-primary-light');
         
         parentAccItem.find('.accordion-button').addClass('bg-primary-light')
         // parentAccItem.find('.accordion-button').addClass('bg-primary-light')

       } else {
          parentAccItem.attr("data-trig",'0');
          setTimeout(() => {
            parentAccItem.removeClass('bg-primary-light');
          }, 200);
          parentAccItem.find('.accordion-button').removeClass('bg-primary-light')
         // parentAccItem.find('.accordion-button').removeClass('bg-primary-light')
       }   
   })

   /**
    * ---------------------- FAQ SHOW MORE -----------------------
    */
   $('#showMore').click(function(e) {
      let str = $('#showMore span')
      // let arrowIcon = $('#showMore i');
      let hidden = $('#hiddenElems');
      // hidden.slideToggle();
      if(str.eq(0).text() === 'See more') {
         str.eq(0).text('See less');
         hidden.slideDown();
         // arrowIcon.eq(0).attr('class', 'icon-chevron-up');
      } else {
         str.eq(0).text('See more');

         hidden.hide(0, function() {
            $(window).scrollTop( 
               $('.showmore-btn').offset().top
            ) 
         });
         
         // arrowIcon.eq(0).attr('class', 'icon-chevron-down');
      }
   });

   /**
    * --------------- PREVENT TEXT INPUT TO WRITE NUMBER AND PUNCTUATION ---------------
    * for paste and dropping text must use extra validation
    */

   //PREVENT TEXT INPUT TO WRITE NUMBER
   $('.name, .lastname, .fullname').on('keypress', function(e) {
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);
      if (/\d/.test(charStr)) {
         return false;
      }
   })

   //PREVENT TEXT INPUT TO WRITE PUNCTUATION
   $('.name, .lastname, .fullname').on('input', function(e) {
      var c = this.selectionStart,
      r = /[^a-zA-ZА-Яа-яÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñƏəĞğÜüŞşŠIı0-9]/,
      v = $(this).val();

      if(r.test(v)) {
         $(this).val(v.replace(r, ''));
         c--;
      }
      this.setSelectionRange(c, c);
   })       

   /**
    * -------------------- LANGUAGE DROPDOWN ------------------------
    */
   
   $(".langtitle").click(function() {
      //Hide and show language dropdown
      //Add opened-lang class when language dropdown opens
      if($(this).hasClass('opened-lang')) {
         $(this).removeClass('opened-lang');
         $(".langlist").hide();
      } else {
         $(this).addClass('opened-lang');
         $(".langlist").show();
      }
   });

   //Language onclick event
   $(".langoption").click(function() {
      //Change selected language 
      $(".langtitle").html(` 
                           <i class="icon-lang"></i> 
                           <span>${$(this).text()}</span>
                           `
      ).removeClass('opened-lang'); 
      //Hide language dropdown after selecting language
      $(".langlist").hide();
   });

      /**
    * ------------------ ANIMATE TAB TEXT WHEN APPEAR -------------
    * HOME PAGE INTRO SECTION TABS
    */
   let tabTxt = $('.intro_content__tab__btn').find('.tail__text')
   //Show only active tab text
   tabTxt.hide();
   $('.intro_content__tab__btn.active').find('.tail__text').show();
   
   $('.intro_content__tab__btn ').on('click', function() {
      let trig = $(this).attr('data-tab-active');

      //if is not active
      if(trig == 0) {
         tabTxt.slideUp();
         $(this).find('.tail__text').slideDown();
         $('.intro_content__tab__btn').attr('data-tab-active','0');
         $(this).attr('data-tab-active','1')
      } 
   })

   /**
    *  ---------------- PREVENT TWO ACTIVE CLASS ON TABS --------
    * RIDER PAGE INTRO SECTION 
    */

   $('#introTabLeft').find('.intro_content__tab__btn ').on('click', function() {
      $('#introTabRight').find('.active').removeClass('active')
   });
   $('#introTabRight').find('.intro_content__tab__btn ').on('click', function() {
      $('#introTabLeft').find('.active').removeClass('active')
   });

   /**
    *  ---------- WINDOW ON LOAD ---------------
    */

   //    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  $(window).on('load', function() {

   const tab = $('.js-tablist-tab');
   const  tabPane = tab.parents('.helpinner__tablist').find('.tab-pane');

   // TAB CONTENT ON MOBILE VIEW

   if($("body").width() < 768) {
      tab.removeClass('active');
      tabPane.removeClass('show active')
      
      tab.on('click',function () { 
         let curTabHref = $(this).attr('href');
         let curTab = curTabHref.replace('#','');
         let curTabPane = $(this).parents('.helpinner__tablist').find(`#${curTab}`)

         //Add data-click attribute to detect active tab
         if($(this).attr('data-click')) {
            tab.show();
            curTabPane.hide()
            $(this).removeAttr('data-click');

            //bootstrap add active class late from the function
            setTimeout(() => {
               $(this).removeClass('active')
            }, 100);
         } 
         else {
            $(this).attr('data-click','1');
            tab.hide();
            $(this).show();
            curTabPane.addClass('active show').slideDown()

            }
      })
   }  else {
         tab.eq(0).addClass('active');
         tabPane.eq(0).addClass('show active')
   }

   /**
    * ***************** COOKIES *************
    */
   //  let $c = $('.cookies')

   // //if clicked once dont show again
   // if(localStorage.getItem("DontShowCookies")) {
   //    hideCookies();
   // }

   // $('#noCookies, #yesCookies').click(function() {
   //    hideCookies();
   //    localStorage.setItem("DontShowCookies", "true");
   // })

   // function hideCookies() {
   //    $c.hide();
   //    $('body').removeClass('fixed'); 
   // }
})

   /**
 *-------------- INCREASE TEXTAREA HEIGHT BASED ON CONTENT -----------------
   */

   // if($('textarea').length > 0) {
   //    //temporary save the default textarea height
   //    const tempTextareaHeight = $("textarea")[0].scrollHeight;
   //    $("textarea").each(function () {
   //       this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
   //    }).on("input", function () {

   //       this.style.height = "auto";
   //       this.style.height = (this.scrollHeight) + "px";

   //       if(this.value == "") {
   //          this.style.height = tempTextareaHeight + "px";
   //       }
      
   //    });
   // }


   /**
    * ------------- RESTART TEXT REVEAL ANIMATION  --------------------
    */

    setInterval(() => {
      let defaultTxt = $('.reveal').find('span');
      let defaultTxtLine = $('.reveal').find('.txt-line');
      let revealFirstTxt = $('.hide-reveal-first').find('span');
      let revealFirstTxtLine = $('.hide-reveal-first').find('.txt-line')
      let revealSecondTxt = $('.hide-reveal-second').find('span');
      let revealSecondTxtLine = $('.hide-reveal-second').find('.txt-line');

      defaultTxt.removeClass('has-reveal-anim');
      defaultTxtLine.removeClass('has-line-anim');
      revealFirstTxt.removeClass('has-reveal-anim-hidden-first');
      revealFirstTxtLine.removeClass('has-line-anim-hidden-first');   
      revealSecondTxt.removeClass('has-reveal-anim-hidden-second');
      revealSecondTxtLine.removeClass('has-line-anim-hidden-second');

      //Must be
      defaultTxt.width();
      defaultTxtLine.width();
      revealFirstTxt.width();
      revealFirstTxtLine.width();
      revealSecondTxt.width();
      revealSecondTxtLine.width();

      defaultTxt.addClass('has-reveal-anim');
      defaultTxtLine.addClass('has-line-anim');
      revealFirstTxt.addClass('has-reveal-anim-hidden-first');
      revealFirstTxtLine.addClass('has-line-anim-hidden-first');
      revealSecondTxt.addClass('has-reveal-anim-hidden-second');
      revealSecondTxtLine.addClass('has-line-anim-hidden-second');
   }, 7050); //restart animation  timeS

   /**
    *  --------------- SELECTPICKER FLOATING LABEL -------------------
    */

   function selectboxFloat (){
      //onclick selectbox float label
      $(this).parents(".main-input-group").find("label").addClass("has-float");

      //Remove empty dropdown item
      let txts = $(this).parents('.form__select').find('.dropdown-menu > li span');
      txts.each(function(i,txt) {
         if($(txt).text() === "") {
            //remove list childrens
            $(this).parents('li').empty();
         }
      })
   }
   //if nothing selected, return label to its default place
   function selectboxUnfloat (){
      $(this).parents(".main-input-group").find("label").removeClass("has-float");
      $(this).parents(".main-input-group").find(".filter-option").addClass("has-option-float");

      //on select empty select option, return label default place
      if($(this).parents('.main-input-group').find('.filter-option-inner-inner').text() === "") {
         $(this).parents(".main-input-group").find("label").removeClass("has-changefloat");
      }
   }
   //on select selectbox option, hold label above
   //w/o this fn, label will place on its default position.
   function selectboxChangefloat (){
      // $(this).parents(".main-input-group").find('.filter-option-inner-inner').addClass('has-changefloat')
      $(this).parents(".main-input-group").find("label").addClass("has-changefloat");

   }
   $(".form__select").on("show.bs.select", selectboxFloat);
   $(".form__select").on("hide.bs.select", selectboxUnfloat);
   $(".form__select").on("changed.bs.select", selectboxChangefloat);

   // if($('select').hasClass('selectpicker')) {
      // $('.form__select').selectpicker({
      //    dropupAuto: false,
      // });  

   // }

   /**
    -----------  SEARCH SELECTPICKER ----------
    */

    /* ADD BREADCRUMS DROPDOWN ITEM  */
    $('.form-select-search').click( function() {      
      let lis = $(this).find('.dropdown-menu ul.dropdown-menu > li');
      lis.each(function () { 

         let strs = $(this).find('a > span');
         strs.each(function() {
            //check if 
            if(!$(this).children('span').length > 0) {
               //temporary save the dropdown item node text
               let $temp = $(this).contents().filter(function() {
                  return this.nodeType == 3;
               }).eq(0).text();

               //remove dropdown items content
               $(this).empty(); //remove child elements

               //Insert temporary text inside tag and insert breadcrumbs to dropdown item
                $(this).append(`
                      <span>${$temp}</span>
                        <nav aria-label="breadcrumb ">
                           <ol class="breadcrumb js-dropdown-item-breadcrumb">
                              <li class="breadcrumb-item">Covid-19</li>
                              <li class="breadcrumb-item"">Driver</li>
                           </ol>
                        </nav>
                  `);
            }
         })
       })
   })
   
   //ONCLICK EVENT SELECTPICKER DROPDOWN ITEM
   $('.form-select-search').on("changed.bs.select", function (ev) { 
      var innerTxt = $(this).find('.dropdown-toggle .filter-option-inner');
      innerTxt.children('span').remove(); //remove span tag inside filter-option-inner

      //SET PAGE PATHNAME
      if (this.selectedIndex!==0) {
         let isSelect = !$(this).hasClass('dropdown'); //Check <select> tag

         if(isSelect) {
            let optionVal = this.children[1].value.replace('#', "/"); //get select option value in DOM
            window.location.pathname = optionVal;
         }
      }        
   });

   /* CHANGE SEARCHED TEXT COLOR IN DROPDOWN ITEM */
   $('.bs-searchbox input').on('input',function () { 
      let $t = $(this);
      let val = $t.val();
      //get searched text and create regex
      let regex = new RegExp(val,'g');
      
      let lis = $('.bs-searchbox').parents('.dropdown-menu').find('ul.dropdown-menu > li');
      //Select dropdown items
      lis.each(function(i,li){
         
         //Hide dropdown when results not found
         if($(li).hasClass('no-results')) {
            $(this).parents('div.inner').hide();
         } else {
            //otherwise show
            $(this).parents('div.inner').show();
         }

         let items = $(this).find('a > span'); //each dropdown item content

         items.each(function (i,item) { 

            let str = $(this).children('span');
            //change searched text color
            let newStr = str.text().replace(regex,`<span class="primary">${val}</span>`);

            //When val is empty, it adds primary class to each letter 
            if(val.length > 0) {
               //remove string together with tag
               str.remove();
               //insert new string to item content
               $(this).prepend(`<span>${newStr}</span>`)

            } else {
               str.find('span.primary').removeClass('primary')
            }
         })
      })

   })

   /* REMOVE SEARCHED TEXT COLOR */
   $('.bs-searchbox input').on(' focus', function() {
      //Remove searched text color in dropdown item
      $(this).parents('.dropdown-menu')
               .find('ul.dropdown-menu li a span.primary')
               .contents()
               .unwrap(); //remove only tag
      
      //Hide dropdown menu
      $(this).parents('.dropdown-menu').children('.inner').hide();

      var innerTxt = $(this).parents('.form-select-search').find('.dropdown-toggle .filter-option-inner');

      //if has span tag inside .filter-option-inner
      if(innerTxt.has('span').length > 0) {    
         //Insert span text to searched input value   
         $(this).val(
            innerTxt.children('span').text()
         )
      }  
      
   })   

   //Temporary save input placeholder text 
   const tempInnerInnerTxt = $('.form-select-search').find('.filter-option-inner-inner').text();

   $('.bs-searchbox input').on('blur', function () { 
      var innerTxt = $(this).parents('.form-select-search').find('.dropdown-toggle .filter-option-inner');
      var innerInnerTxt = $(this).parents('.form-select-search').find('.dropdown-toggle .filter-option-inner-inner');

      /* DOM structure
      <div class="filter-option-inner">
         <div class="filter-option-inner-inner">How can I join elyx?</div>
      </div> 
      */

      //CHECK If SOMETHING SEARCHED
      //if searched input is empty
      if($(this).val() == '') {
         innerTxt.children('span').remove(); //remove span tag inside filter-option-inner
         innerInnerTxt.text(tempInnerInnerTxt); 
      } else {
         /* DELETE PLACEHOLDER TEXT AND INSERT SEARCHED TEXT INSIDE ANOTHER ELEMENT */
         innerInnerTxt.text('')

         //Check if has not span tag
         if(innerTxt.has('span').length === 0) {
            //Create span and insert searched text inside it.
            innerTxt.append(
               `<span>${$(this).val()}</span`
               )
         }
         //if has span tag
          else {
            //Insert searched text inside filter-option-inner span
            innerTxt.children('span').text($(this).val())
         }

      }
    })
    
   /**
    * ----------------- SHOW HIDE PASSWORD ---------------
    */
   const password = $('input[type="password"]');
   const togglePassword = $('#togglePassword');

   togglePassword.each(function(i) {
      $(this).on('click', function() {
         const type = password[i].getAttribute('type') === 'password' ? 'text' : 'password';
         password[i].setAttribute('type', type);

         let pwIcon = $(this).children('i') ;
         if(pwIcon.hasClass('icon-eye-on')) {
            pwIcon.removeClass().addClass('icon-eye-off')
         } else {
            pwIcon.removeClass().addClass('icon-eye-on')
         }
      })
   })

   
   /**
    * ---------------- DRIVER FORM VALIDATION --------------------
    */
   var navListItems = $('.form-step a'), //steps
      allWells = $('.setup-content'), //contents
      allNextBtn = $('.nextBtn'),
      prevBtn = $('.prevBtn'),
      field = $('.form_field');
      allWells.hide();


   //Onclick steps
   navListItems.click(function (e) {
      e.preventDefault();
      
      var $target = $($(this).attr('href')),
            $item = $(this);

      //Prevent click to disable items
      if($item.attr('disabled')){
         $(this).css('pointer-events','none')
      }
      //clicking previous item
      else if($item.hasClass('js-form-step-bg')) {
         //remove bg color and add active color
         $(this).removeClass('js-form-step-bg').addClass('step-active');
         //remove all next items active and bg color
         $(this).parent().nextAll().find('a').removeClass('step-active').removeClass('js-form-step-bg');
         allWells.hide();
         $target.show();
      }  
     
      else if (!$item.hasClass('disabled')) {
         //remove all items active color
         // navListItems.removeClass('step-default')
         navListItems.removeClass('step-active').addClass('step-default');
         //add active color to clicked item
         $item.addClass('step-active');
         //add bg color to all previous items
         $item.parent().prevAll().find('a').addClass('js-form-step-bg');
         allWells.hide();
         $target.show();
         // $target.find('input:eq(0)').focus();
      }
   });

   prevBtn.click(function(){
      //select visible content
      let curStep = $(this).parents('body').find('.setup-content').not('.setup-content[style*="display: none"]'),
      //get visible content id
      curStepBtn = curStep.attr("id"),
      //select previous step of the same id step
      prevStepWizard = $('.form_step_panel .form-step a[href="#' + curStepBtn + '"]').parent().prev().children("a");
      //go to previous content
      prevStepWizard.trigger('click');

      //Hide go back button on first step
      let firstStep = $('.form-step').first().find('.step-active')
      if(firstStep) {
         firstStep.parents('.form-step-nav').find('.prevBtn').addClass('invisible')
      }
   });

   // Go to Next step
   allNextBtn.click(function(){
      let curStep = $(this).closest(".setup-content");
      let curStepBtn = curStep.attr("id");
      let nextStepWizard = $('.form_step_panel .form-step a[href="#' + curStepBtn + '"]').parent().next().children("a");
      let curInputs = curStep.find("input, select");
      let isValid = true;

      //Hide error border
      $(".main-input-group .form_field").removeClass("has-error");
      $(".main-input-group .form__select .dropdown-toggle").removeClass("has-error");
      //hide error text
      $('.main-input-group').find('.form-text').hide();

      //get specific input
      for(var i=0; i<curInputs.length; i++){

         if (!curInputs[i].validity.valid){
            isValid = false;
            //add errpr class to invalid input
            $(curInputs[i]).closest(".main-input-group")
                           .find('.main-input__field')
                           .addClass("has-error");
            //add error border to invalid select
            $(curInputs[i]).closest(".main-input-group")
                           .find('.form__select .dropdown-toggle')
                           .addClass('has-error')
            //show invalid text                      
            $(curInputs[i]).closest(".main-input-group")
                           .find('.form-text')
                           .show();
         }
      }

      if (isValid) { 
         //go to next step
         nextStepWizard.removeAttr('disabled').trigger('click');   

         //Show go back button
         $('.prevBtn').removeClass('invisible');

         //Check if last step
         if(nextStepWizard.length === 0) {
            curStep.children('.setup-content-inner').hide(); //Hide input fields
            $('.form-step-nav').hide(); // hide steps
            $('#confirmReq').removeClass('js-hidden'); //show confirmation message
         } 
      }    
   });

   //Validation  
   field.on('change',function() {
      var curStep = $(this).closest(".setup-content");
      let curInputs = curStep.find("input,select");
      let isValid = true;

      for(var i=0; i<curInputs.length; i++){
         if (curInputs[i].validity.valid){
            isValid = false;
            //remove error class from valid input
            $(curInputs[i]).closest(".main-input-group")
                           .find('.main-input__field')
                           .removeClass("has-error");
            //remove error border from valid select
            $(curInputs[i]).closest(".main-input-group")
                           .find('.form__select .dropdown-toggle')
                           .removeClass('has-error')
            //show invalid text                      
            $(curInputs[i]).closest(".main-input-group")
                           .find('.form-text')
                           .hide();
         }//end if
      }          
   })
   

   $('.form_step_panel .form-step a.step-active').trigger('click');

   /* ONCLICK KEYBOARD ENTER GO TO NEXT PAGE */
   field.on('keydown',function (e) {
      // jQuery normalises event.which depending on whether event.which, event.keyCode or event.charCode is supported by the browser:
      if (e.which == 13) {  
         e.preventDefault();
         //go to next step
         $(this).closest('.setup-content').find('.form__button').trigger('click');
         //click search button
         $('.blog .header-nav__searchicon').trigger('click');
        
      }
    }); 
   
   /**
    * -------------------- ONCLICK SEARCH ICON SHOW INPUT ------------------
    */
    $('.header-nav__searchicon').on('click',function() {
      let $t = $(this)
      //show search input
      $t.parents('.main-input-search').addClass('animate-to-left');
      $('.animate-to-left').parent().addClass('animate-to-left-parent');

      let searchInpVal = $t.closest('.main-input-group').find('.main-input__field ').val();
     
      //if input is filled
      if(searchInpVal.length > 0) {
         //hide blog content
         $t.parents('.blog').find('.blog__inner').hide();

         //show error message and insert searched value to it
         $('.search-error-msg').show().children('span').text(`"${searchInpVal}"`);
      } else {
         $t.parents('.blog').find('.blog__inner').show();
         $('.search-error-msg').hide()
      }
   })

   /**
    * -------------- ON SCROLL WINDOW -------------------------
    */
   $(window).scroll(function () {

      //BACK TO TOP
      let position = $(this).scrollTop();

      if (position >= 1600) {
         $('#backToTop').addClass('js-scroll-top');
      }
      else {
         $('#backToTop').removeClass('js-scroll-top');

      }

      // ADD CLASS TO FIXED NAVBAR ON SCROLL
      var $nav = $(".fixed-nav");
      $nav.toggleClass('scrolled', 
                        $(this).scrollTop() > $nav.height() - 50);

      //EXPAND PROGRESS BAR ON SCROLL
      var pageHeight = $(document).height() - $(window).height();
      var progress = 100 * position / pageHeight;
      
      $("div.progressbar").css("width", progress + "%");
   });

   /**
    *  ------------- HIDE SELECTED ITEM IN BOOTSTRAP SELECT --------------
    */
   $('.blog-category ').on('click', function() {
        $(this).find('.dropdown-item').each(function(i, opt) {
         var title =  $('.blog-category-select .filter-option-inner-inner');
         
         if(opt.innerText === title.text()) {
            opt.parentElement.style.display = "none";
         } else {
            opt.parentElement.style.display = "block";
         }
      })
   })

   /**
    * -------------- PHONE INPUT MASK ---------------
    */

   //Prevent removing prefix
   function keepPrefix(event) {
      if(event.target.value.substring(0,4) !== "+994") 
         event.target.value = "+994";
   }

   var telOptions = {
      onKeyPress: function(cep, event, currentField, options){
         keepPrefix(event);
      },
   }
   /* 0 - only number
      A - number, text
      S - only text
   */
   $('input[type="tel"]').mask('+00000 000 00 00', telOptions);
   $('#vehicleNum').mask('00-SS-000'); 


   /**
    * ---------- DISABLE TEXT REVEAL ANIMATION ON MAC, IOS, ANDROID ------------
    */

   function changeTxtOnReload() {
      $('.animated-texts').find('.txt').children().addClass('js-disable-anim');
      //CHANGE TEXT ON PAGE RELOAD
      var rld_cnt = parseInt($.cookie('rld_cnt')||0)+1;
      $.cookie('rld_cnt',rld_cnt);
      var text = ["fast","comfortable","tidy"];
      //Change header title text
      $(".animated-texts").find('span').html(text[rld_cnt % 3]);//change the divided number depends on number of items in array
   }

   // Safari-The only browser where the HTMLElement contains `Constructor`
   conditionizr.add('safari', function () {
      return (
        /Constructor/.test(window.HTMLElement) || 
        (function (root) {
          return (!root || root.pushNotification).toString() === '[object SafariRemoteNotification]';
        })(window.safari)
      );
    });

    conditionizr.on('safari', function() {
      changeTxtOnReload();
    })

    // DETECT IOS DEVICE
    function iOS() {
      //  let platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown'
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    if(iOS()) {
      changeTxtOnReload();
    }

    // DETECT ANDROID
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {
       changeTxtOnReload();
    }



})(jQuery);