export const isLoggedIn = () => {
	return localStorage.getItem('token') ? true : false;
};


const aircraftHoursTotaler = (arr) => {
	let pic_sum = 0; 
	let no_ldg = 0;
	let day = 0;
	let night = 0;
	let cross_country = 0;
	let actual_instr = 0;
	let sim_instr = 0;
	let dual_rec = 0;
	for(let i=0; i<this.state.data.length; i++) {
		pic_sum += this.state.data[i].pic
		no_ldg += this.state.data[i].no_ldg
		day += this.state.data[i].day
		night += this.state.data[i].night
		cross_country += this.state.data[i].cross_country
		actual_instr += this.state.data[i].actual_instr
		sim_instr += this.state.data[i].sim_instr
		dual_rec += this.state.data[i].dual_rec
	}
	return ;
}
 
export default aircraftHoursTotaler;