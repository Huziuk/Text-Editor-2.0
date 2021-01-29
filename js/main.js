$(function(){
  // ! ======= Доступ  до елементів =======
  const TEXT_BLOCK = document.querySelector('.text_block') // ? Доступ до поля редактування
  const TEXTAREA = document.querySelector('.edit_textarea') // ? Доступ до поля редактування
  const HEAD_FORM = document.forms.headerForm   // ? Доступ до форми редактора
  const HEAD_EDIT_FORM = document.forms.editHeaderForm   // ? Доступ до форми редактора
  const SING_IN = document.forms.signInForm
  const CREATE_TABLE = document.forms.createTable
  const createOlForm = document.forms.createOlForm
  const createUlForm = document.forms.createUlForm
  
  let createRegExp = /^\d+$/

  $('.text_block').html($('.edit_textarea').val())


  // ! ======= Вхід та вихід з аккаунт =======
  const login = SING_IN.login;
  const password = SING_IN.password;
  const userLogin = /^admin$/;
  const userPassword = /^12345$/;
  SING_IN.addEventListener('submit', function(event){
    event.preventDefault()
    let checkLogin = userLogin.test(login.value)
    let checkPassword = userPassword.test(password.value)
    if (checkLogin && checkPassword){
      closeBlock('.signin')
      cleanSingin()
      fadeToggleAndOut('.signout_btn', '.signin_btn', 0)
      $('.header__edit').removeClass('header__edit_disabled').removeAttr('disabled')
    } else {
      login.classList.add('singin_form__input--wrong')
      password.classList.add('singin_form__input--wrong')
      if(login.value == '' && password.value == ''){
        $('.singin__message').text('Value is empty')
      } else {
        $('.singin__message').text('Please, check your login or password')
      }
      $('.singin__message').css('opacity', '1')
    }
  })

  $('.signin__cancel_btn').click(function(){
    cleanSingin()
  })
  
  $('.singout__btn').click(function(){
    $('.header__edit').addClass('header__edit_disabled').attr('disabled', '')
    closeBlock('.singout')
    fadeToggleAndOut('.signin_btn', '.signout_btn', 0)
  })

  // ? Функція очищення форми входу
  const cleanSingin = () => {
    $('.singin__message').css('opacity', '0')
    login.value = ''
    password.value = ''
    login.classList.remove('singin_form__input--wrong')
    password.classList.remove('singin_form__input--wrong')
  }

  // ! ======= Створення Таблиці =======
  CREATE_TABLE.addEventListener('click', function(event){
    let name = event.target.name;
    if (name == 'tableCreate'){
      
    }
  })
  // ? ======= Створення Таблиці =======


  // ! ======= Події =======
  HEAD_FORM.addEventListener('click', function(event){ // ? Вішаєм подію на форму редагування
    let name = event.target.name;
    if (name == 'editBtn'){
      fadeToggleAndOut('.edit_textarea', '.text_block', 0)
      fadeToggleAndOut('.header__edit_form', '.header__form', 0)
    }
    // ? Подія кнопки яка задає жирність тексту
    if (name == 'boldTextBtn') { toggleClassForBlock('bold_text') }
    
    // ? Подія кнопки яка задає курсивний текст
    if (name == 'cursiveTextBtn') { toggleClassForBlock('cursive_text') }

    // ? Події які задають Text Decoration
    if (name == 'underlineTextBtn') { toggleClassForBlock('underline_text', 'line_through_text') }
    if (name == 'lineThroughTextBtn') { toggleClassForBlock('line_through_text', 'underline_text') }

    // ? Події для вирівнювання тексту 
    if (name == 'leftAlignBtn') { textAlign('left') }
    if (name == 'centerAlignBtn') { textAlign('center') }
    if (name == 'rightAlignBtn') { textAlign('right') }
    
    // ? Подія кнопки редагування розміру тексту
    if (name == 'textColorBtn') { showBlock('.choose_text_color') }
    
    // ? Подія кнопки редагування розміру тексту
    if (name == 'backImgBtn') { showBlock('.choose_background') }

    // ? Подія кнопки редагування шрифту та розміру тексту
    if (name == 'fontFamilyBtn'){ fadeToggleAndOut('.font_family_block', '.font_size_block', 150)}
    if (name == 'fontSizeBtn') { fadeToggleAndOut('.font_size_block', '.font_family_block', 150)}
    
    // ? Подія кнопки логінування
    if (name == 'signinBtn') { showBlock('.signin')}
    if (name == 'signoutBtn') { showBlock('.singout')}
  })

  HEAD_EDIT_FORM.addEventListener('click', function(event){
    let name = event.target.name;
    if(name == 'save'){
      fadeToggleAndOut('.text_block', '.edit_textarea', 0)
      fadeToggleAndOut('.header__form', '.header__edit_form', 0)
      $('.text_block').html($('.edit_textarea').val())
    }
    if (name == 'createTable'){
      showBlock('.create_table')
    }
    if (name == 'createOl') {
      showBlock('.create_ol')
    }
    if (name == 'createUl') {
      showBlock('.create_ul')
    }
  })

  // ?  Подія для кнопки Cancel, яка закриває блоки
  const cancelBtn = document.querySelectorAll('.cancel_btn')
  for (let index = 0; index < cancelBtn.length; index++) {
    cancelBtn[index].addEventListener('click', () => {
      const parentBlock = $('.cancel_btn').eq(index).parents()[1];
      closeBlock(parentBlock)
    })
  }

  // ? Події для редагування шрифту і розміру тексту
  $('.family').click(() => { editFont('font-family', '.font_family_block') })
  $('.size').click(() => { editFont('font-size', '.font_size_block') })

  // ? Події для редагування кольору тексту і фону
  $('.text_color').click(function () { 
    $('.text_block').css('color', $(this).css('background-color')) 
  })

  $('.background_color').click(function () {
    $('body').css('background', $(this).css('background-color'))
  })

  $('.images').click(function(){
    $('body').css('background', 'no-repeat 0 0/cover ' + $(this).css('background-image'))
  })

  // ? Загрузка фото для фону
  $('.choose_file').change(() => {
    readURL($('.choose_file')[0])
  })
  
  $('.background_btn_color').click(function(){
    $(this).addClass('background_btn--active')
    $('.background_btn_images').removeClass('background_btn--active')
    $('.background_btn_files').removeClass('background_btn--active')
    $('.background_colors_block').fadeIn(0)
    $('.background_images_block_wrapper').fadeOut(0)
    $('.background_files_block').fadeOut(0)
  })
  $('.background_btn_images').click(function(){
    $(this).addClass('background_btn--active')
    $('.background_btn_color').removeClass('background_btn--active')
    $('.background_btn_files').removeClass('background_btn--active')
    $('.background_images_block_wrapper').fadeIn(0)
    $('.background_colors_block').fadeOut(0)
    $('.background_files_block').fadeOut(0)
  })
  $('.background_btn_files').click(function(){
    $(this).addClass('background_btn--active')
    $('.background_btn_color').removeClass('background_btn--active')
    $('.background_btn_images').removeClass('background_btn--active')
    $('.background_files_block').fadeIn(0)
    $('.background_images_block_wrapper').fadeOut(0)
    $('.background_colors_block').fadeOut(0)
  })


  // ? Події для створення таблиці
  $('.create_table__create').click(function(){
    if (checkValue()){
      let table = createTable();
      TEXTAREA.value += table.outerHTML;
    } else {
      $('.ivalid_value_table').fadeIn(150)
    }
  })

  $('.create_table__reset').click(function(){
    CREATE_TABLE.countTR.value = '';
    CREATE_TABLE.countTD.value = '';
    CREATE_TABLE.widthTD.value = '';
    CREATE_TABLE.heightTD.value = '';
    CREATE_TABLE.widthOfBorder.value = '';
    CREATE_TABLE.styleOfBorder.options[0].selected = true;
    CREATE_TABLE.colorOfBorder.options[0].selected = true;
    $('.ivalid_value_table').fadeOut(150)
    for (let index = 0; index < CREATE_TABLE.elements.length; index++) {
      CREATE_TABLE.elements[index].classList.remove('singin_form__input--wrong')
    }
  }) 
  

  // ? Події для створення списків
  createUlForm.addEventListener('click', function(event){
    if (event.target.name == 'resetUl'){
      createUlForm.countUL.value = ''
      createUlForm.typeUlMark.options[0].selected = true
      createUlForm.countUL.classList.remove('singin_form__input--wrong')
      $('.ivalid_value_list').eq(1).fadeOut(150)
      createUlForm.typeUlMark.classList.remove('singin_form__input--wrong')
    }
    if (event.target.name == 'createUl'){
      let countLi = createUlForm.countUL.value
      if (createRegExp.test(countLi) && createUlForm.typeUlMark.options[0].selected != true) {
        let typeList = getSelectOptions(createUlForm.typeUlMark)
        let list = createList('ul', countLi, typeList);
        TEXTAREA.value += list.outerHTML
      }
      if (createRegExp.test(countLi)) {
        createUlForm.countUL.classList.remove('singin_form__input--wrong')
        $('.ivalid_value_list').eq(1).fadeOut(150)
      } else {
        createUlForm.countUL.classList.add('singin_form__input--wrong')
        $('.ivalid_value_list').eq(1).fadeIn(150)
      }
      if (createUlForm.typeUlMark.options[0].selected) {
        createUlForm.typeUlMark.classList.add('singin_form__input--wrong')
        $('.ivalid_value_list').eq(1).fadeIn(150)
      } else {
        createUlForm.typeUlMark.classList.remove('singin_form__input--wrong')
        $('.ivalid_value_list').eq(1).fadeOut(150)
      }
    }
  })
  
  createOlForm.addEventListener('click', function (event) {
    if (event.target.name == 'resetOl') {
      createOlForm.countOL.value = ''
      createOlForm.typeOlMark.options[0].selected = true
      createOlForm.countOL.classList.remove('singin_form__input--wrong')
      $('.ivalid_value_list').eq(0).fadeOut(150)
      createOlForm.typeOlMark.classList.remove('singin_form__input--wrong')
    }
    if(event.target.name == 'createOl'){
      let countLi = createOlForm.countOL.value
      if (createRegExp.test(countLi) && createOlForm.typeOlMark.options[0].selected != true) {
        let typeList = getSelectOptions(createOlForm.typeOlMark)
        let list = createList('ol', countLi, typeList);
        TEXTAREA.value += list.outerHTML
      }
      if (createRegExp.test(countLi)) {
        createOlForm.countOL.classList.remove('singin_form__input--wrong')
        $('.ivalid_value_list').eq(0).fadeOut(150)
      } else {
        createOlForm.countOL.classList.add('singin_form__input--wrong')
        $('.ivalid_value_list').eq(0).fadeIn(150)
      }
      if (createOlForm.typeOlMark.options[0].selected) {
        createOlForm.typeOlMark.classList.add('singin_form__input--wrong')
        $('.ivalid_value_list').eq(0).fadeIn(150)
      } else {
        createOlForm.typeOlMark.classList.remove('singin_form__input--wrong')
        $('.ivalid_value_list').eq(0).fadeOut(150)
      }
    }
  })

  // ! ======= Функції =======
  // ? Повернення текс контенту
  const returnContent = function () {
    return event.target.textContent;
  }

  const editFont = (property, block) => {
    $('.text_block').css(property, returnContent())
    $(block).fadeOut(150)
  }

  // ? Функція для показу і скривання блоків для редагування шрифту
  const fadeToggleAndOut = (fadeToggle, fadeOut, time) => {
    $(fadeToggle).fadeToggle(time)
    $(fadeOut).fadeOut(time)
  }

  // ? Функція для вирівнювання тексту
  const textAlign = (align) => {
    $('.text_block').css('text-align', align)
  }

  // ? Функція для додавання і видаляння класу
  const toggleClassForBlock = (yourClass, removeClass) => {
    $('.text_block').toggleClass(yourClass)
    $('.text_block').removeClass(removeClass)
  }

  // ? Функція для показу певного блоку
  const showBlock = (block) =>{
    $('.modalBackgeound').fadeIn(150)
    $(block).fadeIn(10).animate({
      top: 200,
      opacity: 1
    })
  }

  // ? Функція для приховування певного блоку
  const closeBlock = (block) => {
    $('.modalBackgeound').fadeOut(150)
    $(block).animate({
      top: 110,
      opacity: 0
    }).fadeOut(10)
  }
  
  // ? Загрузка картинки і встановлення її на фон
  const readURL = (input) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
        $('body').css('background', 'no-repeat 0 0/cover ' + 'url(' + e.target.result + ')');
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  // ? Функція створення таблиці 
  const createTable = function(){
    let table = document.createElement('table')
    table.style.cssText = 'border-spacing: 0; border-collapse: collapse;}'
    let countTR = CREATE_TABLE.countTR.value;
    let countTD = CREATE_TABLE.countTD.value;
    let widthTD = CREATE_TABLE.widthTD.value;
    let heightTD = CREATE_TABLE.heightTD.value;
    let borderWidth = CREATE_TABLE.widthOfBorder.value;
    let styleOfBorder = getSelectOptions(CREATE_TABLE.styleOfBorder)
    let colorOfBorder = getSelectOptions(CREATE_TABLE.colorOfBorder)

    for (let index = 0; index < countTR; index++) {
      let tr = document.createElement('tr')
      for (let index = 0; index < countTD; index++) {
        let td = document.createElement('td')
        td.style.cssText = `width: ${widthTD}px; height: ${heightTD}px; 
            border: ${borderWidth}px ${styleOfBorder} ${colorOfBorder}`;
        td.textContent = 'TD';
        tr.appendChild(td)
      }
      table.appendChild(tr)
    }
    return table;
  }
  
  // ? Create List Function
  const createList = function (list, cuontLi, typeList){
    let listElement = document.createElement(`${list}`)
    listElement.setAttribute(`type`, `${typeList}`)
    for (let index = 0; index < cuontLi; index++) {
      let li = document.createElement('li')
      li.textContent = `Item ${index + 1}`
      listElement.appendChild(li)
    }
    return listElement
  }

  const getSelectOptions = function(select){
    for (let index = 0; index < select.length; index++) {
      if (select[index].selected){
        return select[index].value;
      }
    }
  }

  const checkValue = function(){
    let checkCount = 0
    let input = $('input.create_table__item')
    let select = $('select.create_table__item')
    for (let index = 0; index < input.length - 2; index++) {
      if (createRegExp.test(input[index].value)){
        input[index].classList.remove('singin_form__input--wrong')
      } else {
        input[index].classList.add('singin_form__input--wrong')
        checkCount++
      }
    }
    for (let index = 0; index < select.length - 2; index++) {
      if (select[index].options[0].selected == true) {
        checkCount++
        select[index].classList.add('singin_form__input--wrong')
      } else {
        select[index].classList.remove('singin_form__input--wrong')
      }
    }
    if (checkCount > 0){
      $('.ivalid_value_table').fadeIn(0)
      return false
    } else {
      $('.ivalid_value_table').fadeOut(0)
      return true
    }
  }

})


