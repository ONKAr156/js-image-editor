const fileInput = document.querySelector(".file-inp")
const filterValues = document.querySelector(".filter_info .value")
const filterSlider = document.querySelector(".filter_info input")
const filterName = document.querySelector(".filter_info .name")
const imagePreview = document.querySelector(".imgae_section img")
const filterBtns = document.querySelectorAll(".filter_btns button")
const chooseImage = document.querySelector(".chooseImage")
const rotateOptions = document.querySelectorAll(".rotate_btns button")
const resetBtn = document.querySelector(".reset")
const saveBtn = document.querySelector(".save")

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0
let rotate = 0, flipHorizontal = 1, flipVertical = 1
const applFilters = () => {
    imagePreview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    imagePreview.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
}

const loadImage = () => {
    let file = fileInput.files[0]
    if (!file) return;
    console.log(file);
    imagePreview.src = URL.createObjectURL(file)
    imagePreview.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable")
    })
}
filterBtns.forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelector(" .filter_btns .active").classList.remove("active")
        item.classList.add("active")
        filterName.innerHTML = item.innerHTML

        if (item.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness
            filterValues.innerHTML = `${brightness}%`
        }
        else if (item.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation
            filterValues.innerHTML = `${saturation}%`
        }
        else if (item.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale
            filterValues.innerHTML = `${grayscale}%`
        }
        else if (item.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion
            filterValues.innerHTML = `${inversion}%`
        }

    })
})
const updateFilter = () => {
    //  console.log(filterSlider.value);
    filterValues.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter_btns .active")
    // console.log(selectedFilter.id);
    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value
    } else if (selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value
    }
    applFilters()

}
rotateOptions.forEach(item => {
    item.addEventListener("click", () => {
        if (item.id === "left") {
            rotate -= 90
        } else if (item.id === "right") {
            rotate += 90
        } else if (item.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        } else if (item.id === "vertical") {
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applFilters()
    })
});

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterBtns[0].click()
    applFilters()
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(imagePreview, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImage)
filterSlider.addEventListener("input", updateFilter)
chooseImage.addEventListener("click", () => fileInput.click())
resetBtn.addEventListener("click", resetFilter)
saveBtn.addEventListener("click", saveImage)