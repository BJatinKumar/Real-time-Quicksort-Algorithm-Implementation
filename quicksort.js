document.getElementById('sortButton').addEventListener('click', startQuickSort);

function startQuickSort() {
    const input = document.getElementById('numbersInput').value;
    const numbersArray = input.split(',').map(Number).filter(n => !isNaN(n));

    if (numbersArray.length === 0) {
        alert("Please enter valid numbers!");
        return;
    }

    // Clear previous steps
    document.getElementById('visualization').innerHTML = "";

    quickSort(numbersArray, 0, numbersArray.length - 1);
    displaySortedArray(numbersArray);
}

function quickSort(arr, low, high) {
    if (low < high) {
        let pivotIndex = partition(arr, low, high);
        
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    displayStep(`Choosing pivot: ${pivot}`);

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            displayStep(`Swapped ${arr[i]} and ${arr[j]} because ${arr[j]} < pivot (${pivot})`, true);
        } else {
            displayStep(`No swap: ${arr[j]} >= pivot (${pivot})`);
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    displayStep(`Moved pivot ${arr[i + 1]} to its correct position`, true);

    return i + 1;
}

function displayStep(stepDescription, highlight = false) {
    const visualization = document.getElementById('visualization');
    const stepElement = document.createElement('div');
    stepElement.classList.add('step');
    
    if (highlight) {
        stepElement.classList.add('highlight');
    }

    stepElement.innerHTML = stepDescription;
    visualization.appendChild(stepElement);
}

function displaySortedArray(arr) {
    const visualization = document.getElementById('visualization');
    const finalResult = document.createElement('div');
    finalResult.classList.add('final');
    finalResult.innerHTML = `<strong>Sorted Array:</strong> [${arr.join(', ')}]`;
    visualization.appendChild(finalResult);
}
