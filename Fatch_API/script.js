// fetch() ဖြင့် JSON ဖိုင်ကို လှမ်းဖတ်ခြင်း
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded JSON Data:", data);
    
    // Data ကို ဤနေရာတွင် ဆက်လက် အသုံးပြုနိုင်ပါပြီ
    data.forEach(item => {
      console.log(item.title);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));