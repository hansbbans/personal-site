document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.photos-grid');
    const yearSelect = document.getElementById('photoYearFilter');
    const locationSelect = document.getElementById('photoLocationFilter');
    const clearButton = document.getElementById('photoFilterClear');
    const countLabel = document.getElementById('photoFilterCount');

    if (!grid || !yearSelect || !locationSelect || !clearButton || !countLabel) {
        return;
    }

    const items = Array.from(grid.querySelectorAll('.photo-item')).map((item) => {
        const year = item.querySelector('.photo-year')?.textContent.trim() || '';
        const locationEl = item.querySelector('.photo-location');
        const isUnknownLocation = locationEl?.classList.contains('photo-location-unknown') || false;
        const location = isUnknownLocation ? '' : (locationEl?.textContent.trim() || '');
        return { item, year, location };
    });

    const years = Array.from(new Set(items.map((entry) => entry.year).filter(Boolean))).sort((a, b) => Number(b) - Number(a));
    const locations = Array.from(new Set(items.map((entry) => entry.location).filter(Boolean))).sort((a, b) => a.localeCompare(b));

    const addOptions = (select, values, allLabel) => {
        select.innerHTML = '';
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = allLabel;
        select.appendChild(allOption);

        values.forEach((value) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    };

    const applyFilters = () => {
        const selectedYear = yearSelect.value;
        const selectedLocation = locationSelect.value;

        let visibleCount = 0;
        items.forEach(({ item, year, location }) => {
            const yearMatch = selectedYear === 'all' || year === selectedYear;
            const locationMatch = selectedLocation === 'all' || location === selectedLocation;
            const isVisible = yearMatch && locationMatch;
            item.classList.toggle('is-filtered-out', !isVisible);
            if (isVisible) visibleCount += 1;
        });

        countLabel.textContent = `${visibleCount} shown`;
    };

    addOptions(yearSelect, years, 'All years');
    addOptions(locationSelect, locations, 'All locations');

    yearSelect.addEventListener('change', applyFilters);
    locationSelect.addEventListener('change', applyFilters);
    clearButton.addEventListener('click', () => {
        yearSelect.value = 'all';
        locationSelect.value = 'all';
        applyFilters();
    });

    applyFilters();
});
