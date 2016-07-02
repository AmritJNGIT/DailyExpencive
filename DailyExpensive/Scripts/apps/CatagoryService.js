app.service("CatagoryService", function ($http, $q, DomainPath) {

    var fac = {};
    fac.SaveAccount = function (files, CatagoryDetail) {
        var formData = new FormData();

        formData.append("files", files);
        formData.append("Id", CatagoryDetail.Id);
        formData.append("Name", CatagoryDetail.Name);
        var defer = $q.defer();
        $http.post(DomainPath + "/Catagory/SaveCatagory", formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        .success(function (d) {
            defer.resolve(d);
        })
        .error(function () {
            defer.reject("File Upload Failed!");
        });

        return defer.promise;
    }
    return fac;

});