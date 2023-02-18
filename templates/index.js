document.addEventListener('DOMContentLoaded', function () {
	fetch('http://localhost:3000/getAll')
	.then(data => console.log(data));
});

window.onload = function() {
	const addBtn = document.querySelector('#add-task-btn');
	console.log(addBtn)

	addBtn.onclick = function () {
		const taskInput = document.querySelector('#task-input')
		const task = taskInput.value;
		taskInput.value = ''
		console.log(task)
		let user = {
			name: 'John',
			surname: 'Smith'
		  };
		fetch('http://localhost:3000/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			  },
			body: JSON.stringify(user)
		})
	};
}