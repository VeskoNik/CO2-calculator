import { html, page } from "../src/lib.js";

const homeTemplate = (onSubmit) => html`
    <h1>CO2 Calculator</h1>
    <div id="form">
        <form @submit=${onSubmit} >
            <h3>Distance</h3>
            <input id="distance" name="distance" type="number" placeholder="100km" required />
            <h3>Consumption</h3>
            <input type="number" name="consumption" id="consumption" step="0.1" placeholder="7.5l" min="0.1" required >
            <img src="/CO2-calculator/images/fuelType.png" alt="fuelType">
            <select id="fuel" name="fuel">
                <option value="2.33">Gasoline</option>
                <option value="2.64">Diesel</option>
                <option value="1.5">LPG</option>
                <option value="2.9">Gas Oil</option>
                <option value="1.8">Biogasoline</option>
                <option value="1.9">Biodiesel</option>
                <option value="3.15">Aviation fuel(Jet Kerosene)</option>
                <option value="3.1">Heavy fuel oil</option>
                <option value="2.4">Coal</option>
            </select>
            <button type="submit">Calculate</button>
        </form>
    </div>
`

export function homeView(ctx) {
    ctx.render(homeTemplate(onSubmit))
}

function onSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.target)

    const distance = formData.get('distance');
    const consumption = formData.get('consumption');
    const fuelEm = formData.get('fuel');
    const sel = document.getElementById('fuel')
    const fuel = sel.options[sel.selectedIndex].text;

    const fuelConsumption = ((Number(consumption) * Number(distance)) / 100).toFixed(2);
    const kgCO2PerGallon = (Number(consumption) * Number(distance) * Number(fuelEm)) / 100 
    const result = kgCO2PerGallon.toFixed(2)
    const data = {
        result,
        fuel,
        fuelConsumption
    };
    sessionStorage.setItem('userData',JSON.stringify(data))
    page.redirect('/CO2-calculator/result')
    document.querySelector('form').reset()
}
