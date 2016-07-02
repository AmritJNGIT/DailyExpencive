app.service("CatagoryViewService", function ($http, DomainPath) {
    this.CatagoryViewList = function () {
        return $http.get(DomainPath + "/Catagory/GetCatagory")

    }
    this.EditRecord = function (CatagoryId) {
        var response = $http({
            method: "POST",
            url: "/Catagory/selectCatagorydata",
            data: JSON.stringify({ "CatagoryID": CatagoryId }),
            dataType: "Json"
        })
        return response;
    }
    
    this.DeleteCatagory = function (CatagoryId) {
        var response = $http({
            method: "POST",
            url: "/Catagory/DeleteCatagory",
            data: JSON.stringify({ "CatagoryID": CatagoryId }),
            dataType: "Json"
        })
        return response;
    }

});