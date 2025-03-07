let currentID = 1

function addIncomeBox() {
    let incomeForm = document.getElementById('income-form')
    const newIncomeBox = document.createElement('div')
    currentID++
    newIncomeBox.id = `input-${currentID}`
    newIncomeBox.innerHTML = `
                                <label>รายได้ (บาท)</label><br>
                                <input id="inputBox-${currentID}" type="text" value = 0 onchange="changeText()">
                                <lable style="color : red" id="errorBox-${currentID}">
                             `
    incomeForm.appendChild(newIncomeBox)
    console.log(`add complete ${currentID}`)
}

function removeIncomeBox() {
    if (currentID == 1) return
    let incomeForm = document.getElementById(`input-${currentID}`)
    currentID--
    incomeForm.remove()
    changeText()
}

function showError(id) {
    document.getElementById(`errorBox-${id}`).innerHTML = 'Please input positive number'
}
function deleteError(id) {
    document.getElementById(`errorBox-${id}`).innerHTML = ""
}
function changeText() {
    let totalIncome = 0
    for(let i=0;i<currentID;i++) {
        let incomeInput = Number(document.getElementById(`inputBox-${i+1}`).value)
        console.log(incomeInput)
        if(isNaN(incomeInput) || incomeInput < 0) {
            showError(i+1)
        }
        else {
            deleteError(i+1)
        }
        totalIncome += incomeInput
    }
    console.log(`TotalIncome : ${totalIncome}`)
    const [tax, taxRate] = taxCalculate(totalIncome)
    
    document.getElementById('totalIncome').value = totalIncome
    document.getElementById('taxRate').value = taxRate * 100
    document.getElementById('taxTotal').value = tax
}

function taxCalculate(totalIncome) {
    let tax = 0
    let taxRate = 0
    if(totalIncome > 5000000) {
        taxRate = 0.35
        tax = (totalIncome - 5000000) * taxRate + 1265000
    }
    else if(totalIncome > 2000000) {
        taxRate = 0.3
        tax = (totalIncome - 2000000) * taxRate + 365000
    }
    else if(totalIncome > 1000000) {
        taxRate = 0.25
        tax = (totalIncome - 1000000) * taxRate + 115000
    }
    else if(totalIncome > 750000) {
        taxRate = 0.2
        tax = (totalIncome - 750000) * taxRate + 65000
    }
    else if(totalIncome > 500000) {
        taxRate = 0.15
        tax = (totalIncome - 500000) * taxRate + 27500
    }
    else if(totalIncome > 300000) {
        taxRate = 0.1
        tax = (totalIncome - 300000) * taxRate + 7500
    }
    else if(totalIncome > 150000) {
        taxRate = 0.05
        tax = (totalIncome - 150000) * taxRate + 0
    }

    return [tax, taxRate]
}