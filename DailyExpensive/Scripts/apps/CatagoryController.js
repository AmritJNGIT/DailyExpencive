app.controller("CatagoryCtrl", function ($scope,$rootScope, CatagoryService) {

    $scope.AddProofImageFileValid = function (file) {
        var isValid = false;
        if ($scope.selectAddCatagoryImage != null) {
            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif')) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Selected file is Invalid";
            }
        }
        else {
            $scope.FileInvalidMessage = "Image required!";
        }
        $scope.IsFileValid = isValid;
    };
    $scope.selectAddCatagoryImage = function (files) {
        $scope.selectAddCatagoryImage = files[0];
    }
    $scope.CatagorySubmit = function () {
        $scope.Submitted = true;

        var CatagoryDetail = {
            Id: $scope.Catagoryid,
            Name: $scope.Name,
        }
        $scope.AddProofImageFileValid($scope.selectAddCatagoryImage);

        if ($scope.CatagoryForm.$valid) {
            CatagoryService.SaveAccount($scope.selectAddCatagoryImage, CatagoryDetail).then(function (d) {
                $scope.Message = "Record Saved Successfully.."
                ClearForm();
            },
            function (e) {
                alert(e);
            });

        }

        else {
            $scope.response = "Please fill in the required fields";
        }
    }

    function ClearForm(CatagoryForm) {
        $scope.Name = ""
        
    }
    $.getJSON("/Catagory/EditData", function (data) {
        $scope.Name = data;
    })
})