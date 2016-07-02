app.controller("AccontDetailCrtl", function ($scope, $window, $log, DomainPath, $http, AccountDetailService) {
    GetAccountDetail();
    function GetAccountDetail() {
        var getAccountDetail = AccountDetailService.AccountDetailList()
        getAccountDetail.then(function (AccountDetailList) {
            for (var i = 0; i < AccountDetailList.data.length; i++) {

            }

            //Send Data Via scope to view
            var Data = [];
            for (var j = 0; j < AccountDetailList.data.length; j++) {
               
                $scope.width = "20",
                $scope.height = "20";
                AccountDetailList.data[j]["AmountTypeImage"] = DomainPath + "/" + "AccountTypeImage/" + AccountDetailList.data[j]["AmountTypeImage"]
            }
            $scope.AccountDetailListtSend = AccountDetailList.data;
           

           
        })
        $scope.DeleteAccount = function (AccountID) {
            var DeleteAccount = AccountDetailService.DeleteAccount(AccountID)
           
            DeleteAccount.then(function (AccountDetailList) {
                for (var i = 0; i < AccountDetailList.data.length; i++) {

                }

                //Send Data Via scope to view
                var Data = [];
                for (var j = 0; j < AccountDetailList.data.length; j++) {

                    $scope.width = "20",
                    $scope.height = "20";
                    AccountDetailList.data[j]["AmountTypeImage"] = DomainPath + "/" + "AccountTypeImage/" + AccountDetailList.data[j]["AmountTypeImage"]
                }
                $scope.AccountDetailListtSend = AccountDetailList.data;



            })
        }
    }
})