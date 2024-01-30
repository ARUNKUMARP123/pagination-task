    const itemsPerPage = 10;
    let currentPage = 1;

    function fetchData() {
      fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
        .then(response => response.json())
        .then(data => {
          displayData(data);
          displayPagination(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function displayData(data) {
      const dataTable = document.getElementById('dataTable');
      const tbody = dataTable.querySelector('tbody');
      tbody.innerHTML = '';

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${data[i].id}</td>
          <td>${data[i].name}</td>
          <td>${data[i].email}</td>
          <!-- Add more columns as needed -->
        `;
        tbody.appendChild(row);
      }
    }

    function displayPagination(data) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const pagination = document.getElementById('pagination');
      pagination.innerHTML = '';

      const prevBtn = document.createElement('li');
      prevBtn.textContent = 'Previous';
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          displayData(data);
        }
      });
      pagination.appendChild(prevBtn);

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        li.addEventListener('click', () => {
          currentPage = i;
          displayData(data);
        });
        pagination.appendChild(li);
      }
      const nextBtn = document.createElement('li');
      nextBtn.textContent = 'Next';
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayData(data);
        }
      });
      pagination.appendChild(nextBtn);
    }

    // Initial fetch and display
    fetchData();