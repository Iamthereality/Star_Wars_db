export default class {
    #api_base = 'https://swapi.co/api';
    #img_url = `https://starwars-visualguide.com/assets/img/`;

    get_data = async (url) => {
        const server_response = await fetch(`${this.#api_base}${url}`);
        if (!server_response.ok) {
            throw new Error(`Could not fetch ${this.#api_base}${url}, received ${server_response.status}`);
        }
        return await server_response.json();
    };

    #extract_id = (item) => {
        const reg_exp = /\/([0-9]*)\/$/;
        return item.url.match(reg_exp)[1];
    };

    get_planet_img = async (id) => {
        const query = `${this.#img_url}planets/${id}.jpg`;
        return await fetch(query);
    };

    #transform_planet_data = (planet) => {
        return {
            id: this.#extract_id(planet),
            name: planet.name,
            population: planet.population,
            rotation_period: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    get_all_planets = async () => {
        const result = await this.get_data(`/planets/`);
        // console.log(result);
        return result.results.map(this.#transform_planet_data);
    };

    get_planet = async (id) => {
        const planet = await this.get_data(`/planets/${id}`);
        return this.#transform_planet_data(planet);
    };

    get_starship_img = async (id) => {
        const query = `${this.#img_url}starships/${id}.jpg`;
        return await fetch(query);
    };

    #transform_starship_data = (starship) => {
        return {
            id: this.#extract_id(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            passengers: starship.passengers,
            length: starship.length,
            crew: starship.crew,
            cost_in_credits: starship.cost_in_credits,
            cargo_capacity: starship.cargo_capacity
        }
    };

    get_all_starships = async () => {
        const result = await this.get_data(`/starships/`);
        return result.results.map(this.#transform_starship_data);
    };

    get_starship = async (id) => {
        const starship = await this.get_data(`/starships/${id}`);
        return this.#transform_starship_data(starship);
    };

    get_person_img = async (id) => {
        const query = `${this.#img_url}characters/${id}.jpg`;
        return await fetch(query);
    };

    #transform_person_data = (person) => {
        return {
            id: this.#extract_id(person),
            name: person.name,
            gender: person.gender,
            birth_year: person.birth_year,
            eye_color: person.eye_color
        }
    };

    get_all_persons = async () => {
        const result = await this.get_data(`/people/`);
        return result.results.map(this.#transform_person_data);
    };

    get_person = async (id) => {
        const person = await this.get_data(`/people/${id}`);
        return this.#transform_person_data(person);
    };
}