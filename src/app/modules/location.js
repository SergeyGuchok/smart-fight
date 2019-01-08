export class Location {
  constructor() {
    this.imgSource = './src/img/';
    this.locationsSrc = ['background-1.png', 'background-2.png', 'background-3.png', 'background-4.png'];
    this.locations = ['City', 'Forest', 'Mars', 'Moon'];
  }

  _createLocations() {
    const locationsWrapper = document.createElement('div');
    locationsWrapper.classList.add('locations');

    this.locationsSrc.forEach((item, index) => {
      const locationWrapper = document.createElement('div');
      const img = document.createElement('img');
      const locationName = document.createElement('p');

      locationName.textContent = this.locations[index];
      locationName.classList.add('location-name');

      locationWrapper.appendChild(locationName);

      locationWrapper.classList.add('location-wrapper');
      locationWrapper.appendChild(img);

      img.src = this.imgSource + item;
      img.alt = this.locations[index];

      locationsWrapper.appendChild(locationWrapper);

      locationWrapper.addEventListener('mouseover', function changeStyle() {
        this.style.width = '100%';
        this.children[0].style.opacity = 1;
      });
      locationWrapper.addEventListener('mouseleave', function resetStyle() {
        this.style.width = '25%';
        this.children[0].style.opacity = 0;
      });
    });

    document.querySelector('.canvas-wrapper').appendChild(locationsWrapper);

    return locationsWrapper;
  }

  chooseLocation() {
    return this._createLocations();
  }
}
