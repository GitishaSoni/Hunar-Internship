document.getElementById('calculate').addEventListener('click', function(){
    const h=parseFloat( document.getElementById('height').value);

    const w=parseFloat(document.getElementById('weight').value);
    
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        document.getElementById('result').innerText = 'Please enter valid height and weight.';
    } else {
        const result = w / ((h / 100) ** 2);
        document.getElementById('result').innerText = `${result.toFixed(2)}`;
}})