$(document).ready(function() {
	$("#newDir").click(newDir);
});

function newDir() {
	var name = prompt("Enter folder name: ");
	if (name !== null) {
		$.ajax({
			url: "/newDir",
			type: "POST",
			data: {
				"path": window.location.pathname + name
			},
			dataType: "text",
			success: function(data, textStatus, jqXHR) {
				alert("SUCCESS");
				console.log(data);
				location.reload();
				//console.log(data);
				/*$(document).ready(function() {
					$("#fileList").html(data);
				});*/
			},
			error: function (jqXHR, status, errorThrown) {
				alert("Error in newDir, status & errorThrown: " + status + ", " + errorThrown);
			}		
		});
	}
}