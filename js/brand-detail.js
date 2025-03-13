document.addEventListener('DOMContentLoaded', () => {
    const brandDetailContainer = document.getElementById('brand-detail');
    let currentBrand;
    let brands = [];

    const fetchBrands = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/brands');
            brands = await response.json();
            initializeBrand();
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const initializeBrand = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const brandId = urlParams.get('id');
        currentBrand = brands.find(brand => brand._id === brandId) || brands[0];
        console.log('Current brand:', currentBrand); // For debugging
        renderBrandDetail();
    };

    const renderBrandDetail = () => {
        if (currentBrand) {
            const baseUrl = 'http://localhost:5000/'; // Adjust this if your backend URL is different
            brandDetailContainer.innerHTML = `
                <div class="detail_head">
                    <div class="detail_back"><a href="Brand.html" id="prevBrand">Back</a></div>
                    <div class="brand_name">${currentBrand.name}</div>
                    <div class="detail_next"><a href="#" id="nextBrand">Next</a></div>
                </div>
                <div class="detail_content">
                    <div class="detail_main_img">
                        <img src="${baseUrl}${currentBrand.image}" alt="${currentBrand.name}">
                    </div>
                    <div class="brand_story">
                        <h3>Story</h3>
                        <p>${currentBrand.story || 'No story available for this brand.'}</p>
                    </div>
                    <div class="detail_img_grid">
                        <img src="${baseUrl}${currentBrand.gridImage1}" alt="${currentBrand.name} Detail 1">
                        <img src="${baseUrl}${currentBrand.gridImage2}" alt="${currentBrand.name} Detail 2">
                    </div>
                    <div class="detail_bottom_img">
                        <img src="${baseUrl}${currentBrand.gridImage3}" alt="${currentBrand.name} Detail 3">
                    </div>
                </div>
                <div class="detail_end">
                    <a href="#" id="prevBrandBottom">Back</a>
                    <a href="Brand.html">All Brands</a>
                    <a href="#" id="nextBrandBottom">Next</a>
                </div>
            `;

            document.getElementById('nextBrand').addEventListener('click', navigateToNext);
            document.getElementById('nextBrandBottom').addEventListener('click', navigateToNext);
            document.getElementById('prevBrand').addEventListener('click', navigateToPrev);
            document.getElementById('prevBrandBottom').addEventListener('click', navigateToPrev);
        } else {
            brandDetailContainer.innerHTML = '<p>Brand not found.</p>';
        }
    };

    const navigateToNext = (e) => {
        e.preventDefault();
        const currentIndex = brands.findIndex(brand => brand._id === currentBrand._id);
        const nextIndex = (currentIndex + 1) % brands.length;
        currentBrand = brands[nextIndex];
        updateURL();
        renderBrandDetail();
    };

    const navigateToPrev = (e) => {
        e.preventDefault();
        const currentIndex = brands.findIndex(brand => brand._id === currentBrand._id);
        const prevIndex = (currentIndex - 1 + brands.length) % brands.length;
        currentBrand = brands[prevIndex];
        updateURL();
        renderBrandDetail();
    };

    const updateURL = () => {
        const newUrl = `${window.location.pathname}?id=${currentBrand._id}`;
        history.pushState(null, '', newUrl);
    };

    fetchBrands();
});