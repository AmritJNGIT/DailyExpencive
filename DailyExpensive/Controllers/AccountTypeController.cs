using DailyExpensive.Repositpry;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DailyExpensive.Controllers
{
   
    public class AccountTypeController : Controller
    {
        // GET: AccountType
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult AccountListData()
        {
            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            var AccountDetailList = (from emp in objContext.tblAccounts select new { emp.Id, emp.Amount, emp.AmountType,emp.AmountTypeImage }).ToList();
            return Json(AccountDetailList.ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult AccountDetailType()
        {
            return View();
        }
        [HttpPost]
        public JsonResult AccountData(tblAccount objAccount)
        {
            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            foreach (string file in Request.Files)
            {
                string AddressProofFileName, AddressFileNameID;
                var fileContent = Request.Files[file];
                if (fileContent != null && fileContent.ContentLength > 0)
                {
                    var inputStream = fileContent.InputStream;
                    var fileName = fileContent.FileName;
                    string path =(Path.Combine(Server.MapPath("~/AccountTypeImage"), fileName));
                    fileContent.SaveAs(path);
                    objAccount.AmountTypeImage = fileName;
                    objAccount.CreatedOn = DateTime.Now;
                }
            }
            objContext.tblAccounts.Add(objAccount);
            objContext.SaveChanges();
            

            return Json(null);
        }
        public JsonResult DeleteAccount(int AccountID)
        {

            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            tblAccount ObjDeleteAccount = objContext.tblAccounts.First(i => i.Id == AccountID);
            objContext.tblAccounts.Remove(ObjDeleteAccount);
            objContext.SaveChanges();
           
            var AccountDetailList = (from emp in objContext.tblAccounts select new { emp.Id, emp.Amount, emp.AmountType, emp.AmountTypeImage }).ToList();
            return Json(AccountDetailList.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}