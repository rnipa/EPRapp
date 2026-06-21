// ================================
// Rasidul ERP V2 Core System
// ================================

// Save Any Data
function saveData(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

// Load Any Data
function loadData(key, defaultValue = {}){
    try{
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    }catch{
        return defaultValue;
    }
}

// Save Form Values
function saveForm(formId){

    const form = document.getElementById(formId);

    if(!form) return;

    const data = {};

    form.querySelectorAll("input, textarea, select").forEach(el=>{

        if(el.type !== "file"){
            data[el.id] = el.value;
        }

    });

    saveData(formId,data);

}

// Restore Form Values
function restoreForm(formId){

    const form = document.getElementById(formId);

    if(!form) return;

    const data = loadData(formId,{});

    Object.keys(data).forEach(key=>{

        const el = document.getElementById(key);

        if(el){
            el.value = data[key];
        }

    });

}

// Convert To Number
function num(id){

    const el = document.getElementById(id);

    if(!el) return 0;

    return Number(el.value) || 0;

}

// Money Format
function money(value){

    return Number(value || 0).toLocaleString('en-US') + ' ৳';

}

// Current Date Time
function now(){

    return new Date().toLocaleString();

}

// Update Working Capital
function updateWorkingCapital(){

    const mfs =
        num('mfsCapital');

    const recharge =
        num('rechargeCapital');

    const total =
        mfs + recharge;

    const box =
        document.getElementById('workingCapitalBox');

    if(box){

        box.innerHTML =
            money(total);

    }

    return total;

}

// Opening Totals
function getOpeningTotals(){

    const emoney =
        num('obk') +
        num('ong') +
        num('ork') +
        num('ogp') +
        num('orobi') +
        num('oair') +
        num('obl') +
        num('otk');

    const cash =
        num('omc') +
        num('orc');

    return {
        emoney,
        cash
    };

}

// Closing Totals
function getClosingTotals(){

    const emoney =
        num('cbk') +
        num('cng') +
        num('crk') +
        num('cgp') +
        num('crobi') +
        num('cair') +
        num('cbl') +
        num('ctk');

    const cash =
        num('cmc') +
        num('crc');

    return {
        emoney,
        cash
    };

}

// Update Balance Cards
function updateBalanceCards(){

    const open =
        getOpeningTotals();

    const close =
        getClosingTotals();

    const openingEmoney =
        document.getElementById('openingEmoney');

    const openingCash =
        document.getElementById('openingCash');

    const closingEmoney =
        document.getElementById('closingEmoney');

    const closingCash =
        document.getElementById('closingCash');

    if(openingEmoney)
        openingEmoney.innerHTML =
            money(open.emoney);

    if(openingCash)
        openingCash.innerHTML =
            money(open.cash);

    if(closingEmoney)
        closingEmoney.innerHTML =
            money(close.emoney);

    if(closingCash)
        closingCash.innerHTML =
            money(close.cash);

}

// Auto Save All Inputs
function enableAutoSave(){

    document
    .querySelectorAll(
        'input, textarea, select'
    )
    .forEach(el=>{

        el.addEventListener(
            'input',
            ()=>{
                saveForm('erpForm');
            }
        );

    });

}

// Create Backup
function createEmergencyBackup(){

    const backup = {

        time: now(),

        form:
        loadData(
            'erpForm',
            {}
        )

    };

    let backups =
        loadData(
            'erpEmergencyBackups',
            []
        );

    backups.unshift(
        backup
    );

    backups =
        backups.slice(
            0,
            10
        );

    saveData(
        'erpEmergencyBackups',
        backups
    );

}

// Init Core
function initCore(){

    restoreForm(
        'erpForm'
    );

    updateWorkingCapital();

    updateBalanceCards();

}
