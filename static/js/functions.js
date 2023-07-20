function testFunction() {
	alert("Hello from a static file!");
}



$(document).ready(function(){

	$('#btnRefresh').click(function () {
		//console.log("ovo je btnRefresh");
		alert("ovo je btnRefresh");
		//window.location.replace("/");
		
	});

	$('#btnCancel').click(function () {
		//$("#player_details").hide();
		alert("ovo je btnCancel");
	});

	// code to read selected table row cell data (values).
	$("#tbl_spider_list").on('click','.btnStop',function(){
		// get the current row
		var currentRow=$(this).closest("tr"); 
		
		var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
		var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
		var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
		var data=col1+"\n"+col2+"\n"+col3;


		//window.location.replace("/?pid=" + col1);
		//window.location.replace("/interface");
		
		console.log(data);
		console.log("ovo je tablica kill");
	});

	$("#tbl_spiders").on('click','.btnSelect',function(){
		// get the current row
		var currentRow=$(this).closest("tr"); 
		
		var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
		var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
		var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
		var data=col1+"\n"+col2+"\n"+col3;


		window.location.replace("/active_spiders?pid=" + col1);
		//window.location.replace("/interface");
		
		//console.log(data);
		//console.log("ovo je tablica kill");
	});

	/* $('#tbl_spiders').on('click', 'tbody tr', function () {
		var table = $('#tbl_spiders').DataTable();
		var row = table.row($(this)).data();

		console.log(row);
		str_name = row.firstname;
		str_lastname = row.lastname;
		//console.log(str_name);
		$('#row_id').text(row.id);
		$('#row_taxnumber').val(row.tax_number);
		$('#row_lastname').val(row.lastname.charAt(0).toUpperCase() + row.lastname.slice(1));
		$('#row_name').val(row.firstname.charAt(0).toUpperCase() + row.firstname.slice(1));
		$('#row_height').val(row.height);
		$('#row_weight').val(row.weight);
		$('#row_year_of_birth').val(row.year_of_birth);
		$('#dropdown_nationality').val(row.nationality_id);

		$("#player_details").show();
		//$("#tblPlayerEdit").hide();
	}); */
	

}); //end document ready


function ajax_js(action, payload) {
	jQuery(function($) {
		$.ajax({ //ajax request
			type:"POST",
			dataType: "json",
			url:"/ajaxcall/",
			data: JSON.stringify({
				action: action,
				payload: payload,
			}),
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"X-CSRFToken": get_cookie("csrftoken"),
			},
			success:function(data) { //result
				console.log('sve ok');
				//console.log(data);
				// convert to JOSON
				data = JSON.parse(data);

				switch(action) {
					case "get_players_data":
						fillTablePlayers(data);
						break;
					case "get_nationality_dropdown_data":
						fillNationalityDropdown(data);
						break;
					
					default:
						console.log('unknown action ' + action);
				}
			},
			error: function(errorThrown){
				console.log('error');
				console.log(errorThrown);
			}
		});
	});
}


function get_cookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
	  const cookies = document.cookie.split(";");
	  for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// Does this cookie string begin with the name we want?
		if (cookie.substring(0, name.length + 1) === (name + "=")) {
		  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		  break;
		}
	  }
	}
	return cookieValue;
}

function InitTblSpiderList() {
	$(document).ready(function(){
		$('#tblTest').DataTable({
			lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "svi"] ],
			searching: true, //polje search
			info: true, //obavijest o broju prikazanih redova od ukupnog broja
			lengthChange: false, //ne može se mijenjati broj redova po stranici
			pageLength: 10, //broj redova po stranici (ako nemam prikazan lengthMenu)
			select: true, //klikom na red isti se selektira

			//data: data, //popunjava tablicu zadanim podacima
			columns: [
				{ data: 'id' },
				{ data: 'name' },
			],
			columnDefs: [
				//{ "visible": false, "targets": 0 },
			],
			language: {
				lengthMenu: "Zapisa po str. _MENU_",
				search: "Search:",
				info: "_START_ from _TOTAL_",
				infoEmpty: "",
				zeroRecords: "Nema podataka prema zadanim parametrima",
				emptyTable: " ",
				infoFiltered: "(filtrirano od _MAX_ zapisa)",
				paginate: {
					first:    '«',
					previous: '‹',
					next:     '›',
					last:     '»'
				},
				select: {
					rows: "" //"%d rows selected"
				}
			}
		});

		
	}); // end document ready
}

function fillTablePlayers(data) {
	var table = $('#tblPlayers').DataTable();
	table.clear();
	//table.rows.add(JSON.parse(abc)).draw();
	table.rows.add(data).draw();

}


function fillTableTest() {

	
	var table = $('#tblTest').DataTable();
	table.clear();
	//table.rows.add(JSON.parse(abc)).draw();
	
	//data = JSON.parse("[{'id': 1, 'lastname': 'Svemirko', 'name': 'Tomek'}]");
	//abc = '{"abc": "1", "aaa": "Svemirko", "bbb": "Tomek"}';
	//const jsonArr = '[{"id": 1, "name": "Tom"}, {"id": 2, "name": "Alice"}]';
	const jsonArr = '[{"1", "Tom"}, {"2", "Alice"}]';
	//const arr = JSON.parse(jsonArr);
	//data = JSON.parse(abc);
	table.rows.add(jsonArr).draw();
	//table.row.add(['1', 'kiki']).draw();



}





function fillNationalityDropdown(data) {
	//console.log("ovo je data");
	//console.log(data);
	
	$.each(data, function(key, item) {
		var $option = $("<option/>", {
			value: item['id'],
			text: item['name']
		});
		$('#dropdown_nationality').append($option);
	});

}