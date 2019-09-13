import { validacion, validacionFinal } from "./validacion.js.js";

export function app() {
    console.log('Cargada app') 

    // Variables

    let oDatos =  {
        userName: '',
        userPasswd: '',
        email: '',
        dni: '',
        horario: '',
        birthDate: '',
        info: '',
        isOk: 'on',
        curso: '',
        sitio: '',    
    }

    let oSustituirDatos =  {
        userName: 'Nombre de Usuario',
        userPasswd: 'Contraseña',
        email: 'Correo electrónico',
        dni: 'D.N.I.',
        horario: 'Formación',
        birthDate: 'Fecha de nacimiento',
        info: 'Más información',
        isOk: 'Condiciones aceptadas',
        curso: 'Curso',
        sitio: 'Sitio',    
    }

    // Nodos del DOM
    let form = document.querySelector('[name="complete-post"]')
    let botonResetear = document.querySelector('#btnReset')
    let aFormularioDatos = document.querySelectorAll('.form_data')
    let aValidacionBox = document.querySelectorAll('[type="checkbox"]')
    let aSelects = document.querySelectorAll('select')
    let aRadioSitio = document.querySelectorAll('[name="sitio"]')
    let dlgConfirm = document.querySelector('#dlg-confirm')
    let aDlgButtons = document.querySelectorAll('#dlg-confirm button')

    // Definir manejadores
    form.addEventListener('submit', onEnviar)
    botonResetear.addEventListener('click', onResetear)
    aDlgButtons.forEach(btn => btn.addEventListener('click', onClickDlg))

    let aNodosValidables = nodosValidables()
    validacion()

    // Funciones manejadoras de eventos
    
    function onEnviar(ev) {
        ev.preventDefault()
        console.log(`Iniciando submit`)

        if (!validacionFinal(aNodosValidables)) {
            return
        }
        aFormularioDatos.forEach(item => oDatos[item.name] = item.value)
        aValidacionBox.forEach(item => oDatos[item.name] = item.checked)
        aSelects.forEach(item => oDatos[item.name] = item.value)
        oDatos.sitio = getRadio(aRadioSitio)
        renderizarModal()
    }

    function nodosValidables() {
        let aNodos = []
        aFormularioDatos.forEach(
            item => aNodos.push(item)
        )
        aValidacionBox.forEach(
            item => aNodos.push(item)
        )
        aSelects.forEach(
            item => aNodos.push(item)
        )
        aNodos.push(aRadioSitio[0])
        return aNodos.filter(item => !item.checkValidity())
    }

    function onResetear(ev) {}

    function onClickDlg(ev) {
        if(ev.target.textContent.toLowerCase() === 'si') {
            form.submit()
        }
        dlgConfirm.close() 
    }

    function renderizarModal() {
        let html = ''
        for (const key in oDatos) {
                const value = oDatos[key];
                if(key === 'userPasswd') {
                    html += `<li>${oSustituirDatos[key]} --> *****</li>`
                } else if (key === 'isOk') {
                    html += `<li>${oSustituirDatos[key]}</li>`
                } else {
                    html += `<li>${oSustituirDatos[key]} --> ${value}</li>`    
                }
        }
        dlgConfirm.children[1].innerHTML = html
        dlgConfirm.showModal()
    }

    function getRadio(aNodos) {
        for (let i = 0; i < aNodos.length; i++) {
            const item = aNodos[i];
            if(item.checked) {
                return item.value}
        }
    }

 }