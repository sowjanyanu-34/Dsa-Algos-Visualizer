let array = [];
let arraySize = 50;
let animationSpeed = 50; // To Control animation speed
 
// Generate a random array
function generateArray() {
  arraySize = document.getElementById("sizeRange").value;
  array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 400));
  createBars();
}


function createBars() {
  const container = document.getElementById("array-container");
  container.innerHTML = ''; // Clear previous bars

  const containerWidth = container.offsetWidth; // Get the width of the container
  const barWidth = Math.floor(containerWidth / arraySize) - 2; // Dynamic bar width

  array.forEach(value => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`; // Bar height corresponds to array value
    bar.style.width = `${barWidth}px`; // Bar width based on array size
    container.appendChild(bar);
  });
}


// Update speed based on slider input
function updateSpeed() {
  animationSpeed = document.getElementById("speedRange").value;
}

// Swap helper function
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Bubble Sort Implementation
async function bubbleSort() {
  document.getElementById("currentAlgorithm").innerText = "Bubble Sort";
  document.getElementById("timeComplexity").innerText = "O(n²)";
  
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        createBars(); // Re-create bars after every swap
        await new Promise(r => setTimeout(r, 1000 / animationSpeed)); // Control animation speed
      }
    }
  }
}

// Merge Sort Implementation
async function mergeSort() {
  document.getElementById("currentAlgorithm").innerText = "Merge Sort";
  document.getElementById("timeComplexity").innerText = "O(n log n)";
  
  async function merge(arr, l, m, r) {
    let n1 = m - l + 1; 
    let n2 = r - m; 

    let L = new Array(n1);
    let R = new Array(n2);
    
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let i = 0; i < n2; i++) R[i] = arr[m + 1 + i];
    
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      createBars();
      await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    }
    
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      createBars();
      await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    }
    
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      createBars();
      await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    }
  }

  async function mergeSortHelper(arr, l, r) {
    if (l >= r) return;
    
    let m = l + Math.floor((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
  }
  
  await mergeSortHelper(array, 0, array.length - 1);
}

// Quick Sort Implementation
async function quickSort() {
  document.getElementById("currentAlgorithm").innerText = "Quick Sort";
  document.getElementById("timeComplexity").innerText = "O(n log n)";

  async function partition(arr, low, high) {
    let pivot = arr[low]; // Set pivot as the first element
    let i = low;

    for (let j = low + 1; j <= high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
            createBars();
            await new Promise(r => setTimeout(r, 1000 / animationSpeed));
        }
    }

    swap(arr, low, i); // Place pivot in its correct position
    createBars();
    await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    return i; // Return the index of the pivot
}

  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }

  await quickSortHelper(array, 0, array.length - 1);
}

function redirectToPage() {
  window.location.href = 'maze.html';
}

generateArray(); // Initial array generation

