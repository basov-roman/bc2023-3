const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Помилка при читанні файлу JSON:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    const filteredData = jsonData.filter(item => item.txt === "Доходи, усього" || item.txt === "Витрати, усього");

    const txtData = JSON.stringify(filteredData, null, 2);

    fs.writeFile('data.txt', txtData, 'utf8', (err) => {
      if (err) {
        console.error('Помилка при записі у файл txt:', err);
      } else {
        console.log('Дані успішно записано у файл data.txt');
      }
    });
  } catch (error) {
    console.error('Помилка при розпарсюванні JSON:', error);
  }
});