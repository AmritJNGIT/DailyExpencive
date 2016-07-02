app.controller("AccountTypeCtrl", function ($scope, AccountService) {

    $scope.AddProofImageFileValid = function (file) {
        var isValid = false;
        if ($scope.selectAddProofImage != null) {
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
    $scope.selectAddProofImage = function (files) {
        $scope.selectAddProofImage = files[0];
    }
    $scope.AccountSubmit = function () {
        $scope.Submitted = true;
        
        var AccountDetail = {
            Amount: $scope.Amount,
            AmountType: $scope.dllAccountDetail,
            CreatedOn: new Date()
             
        }
        $scope.AddProofImageFileValid($scope.selectAddProofImage);
        
        if ($scope.AccountForm.$valid) {
            AccountService.SaveAccount($scope.selectAddProofImage, AccountDetail).then(function (d) {
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
    
    function ClearForm(AccountForm) {
        $scope.Amount = "",
        $scope.dllAccountType = ""
    }
})