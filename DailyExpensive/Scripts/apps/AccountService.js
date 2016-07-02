app.service("AccountService", function ($http, $q, DomainPath) {

    var fac = {};
    fac.SaveAccount = function (files, AccountDetail) {
        var formData = new FormData();

        formData.append("files", files);
        formData.append("Id", AccountDetail.Id);
        formData.append("Amount", AccountDetail.Amount);
        formData.append("AmountType", AccountDetail.AmountType);
        var CuurentDate = AccountDetail.CreatedOn;
        formData.append("CreatedOn", CuurentDate);
        var defer = $q.defer();
        $http.post(DomainPath + "/AccountType/AccountData", formData,
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