const fs = require('fs'); // Підключаємо модуль fs для роботи з файлами

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Помилка при читанні файлу JSON:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data); // Розпарсимо JSON дані

    // Відкриваємо файл для запису
    const stream = fs.createWriteStream('output.txt', { flags: 'w' });

    // Цикл для обробки кожного об'єкта та запису у файл тільки для "Доходи, усього" і "Витрати, усього"
    for (const item of jsonData) {
      if (item.txt === "Доходи, усього" || item.txt === "Витрати, усього") {
        const line = `${item.txt}:${item.value}\n`; // Форматуємо рядок у відповідний формат
        stream.write(line); // Записуємо рядок у файл
      }
    }

    stream.end(); // Завершуємо запис у файл

    console.log('Дані успішно записано у файл output.txt');
  } catch (error) {
    console.error('Помилка при розпарсюванні JSON:', error);
  }
});