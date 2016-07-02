app.controller("CatagoryViewCrtl", function ($scope,$rootScope, $window, $log, DomainPath, $http, CatagoryViewService) {
    
    GetCatagoryDetail();
    function GetCatagoryDetail() {
        var getCatagoryDetail = CatagoryViewService.CatagoryViewList()
        getCatagoryDetail.then(function (CatagoryViewList) {
            for (var i = 0; i < CatagoryViewList.data.length; i++) {

            }

            //Send Data Via scope to view
            var Data = [];
            for (var j = 0; j < CatagoryViewList.data.length; j++) {

                $scope.width = "20",
                $scope.height = "20";
                CatagoryViewList.data[j]["CatagoryImage"] = DomainPath + "/" + "CatagoryImage/" + CatagoryViewList.data[j]["CatagoryImage"]
            }
            $scope.CatagoryviewListtSend = CatagoryViewList.data;

        })
        $scope.DeleteCatagory = function (CatagoryID) {
            var DeleteCatagory = CatagoryViewService.DeleteCatagory(CatagoryID)

            DeleteCatagory.then(function (CatagoryViewList) {
                for (var i = 0; i < CatagoryViewList.data.length; i++) {

                }

                //Send Data Via scope to view
                var Data = [];
                for (var j = 0; j < CatagoryViewList.data.length; j++) {

                    $scope.width = "20",
                    $scope.height = "20";
                    CatagoryViewList.data[j]["CatagoryImage"] = DomainPath + "/" + "CatagoryImage/" + CatagoryViewList.data[j]["CatagoryImage"]
                }
                $scope.CatagoryviewListtSend = CatagoryViewList.data;

            })
        }
        $scope.EditCatagory = function (CatagoryID) {
            var getEditCatagory = CatagoryViewService.EditRecord(CatagoryID);
            
            getEditCatagory.then(function (CatagoryList) {
                var Catagory = CatagoryList.data[0]["Cata"].Name;
                var form = new FormData();
                form.append("Catagory", Catagory)
                $.ajax({
                    method: "POST",
                    url: DomainPath + "Catagory/Catagory",
                    data: form,
                    contentType: false,
                    processData: false,
                    success:function(data)
                    {
                        var url = "http://" + $window.location.host + "/" + "Catagory/Catagory";
                        $window.location.href = url;
                    }
                })
               

            })
        }
    }
})