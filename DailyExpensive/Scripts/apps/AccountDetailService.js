app.service("AccountDetailService", function ($http, DomainPath) {
    this.AccountDetailList = function () {
        return $http.get(DomainPath + "/AccountType/AccountListData")

    }
    this.DeleteAccount = function (AccountId) {
        var response = $http({
            method: "POST",
            url: "/AccountType/DeleteAccount",
            data: JSON.stringify({ "AccountID": AccountId }),
            dataType: "Json"
        })
        return response;
    }

});