using DailyExpensive.Models;
using DailyExpensive.Repositpry;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DailyExpensive.Controllers
{
    public class CatagoryController : Controller
    {
        // GET: Catagory
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult EditData()
        {
            var Data = TempData.Peek("CategoryData");

            return Json(Data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Catagory()
        {
            if (Request.Form["Catagory"]!=null)
            { 
                var CatagoryData = Request.Form["Catagory"].ToString();
                TempData["CategoryData"] = CatagoryData;
                TempData.Peek("CategoryData");
               
            }
            return View();
        }
        [HttpGet]
        public JsonResult GetCatagory()
        {
            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            var CatagoryViewList = (from emp in objContext.Catagories select new { emp.Id, emp.Name, emp.CatagoryImage }).ToList();
            return Json(CatagoryViewList.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveCatagory(Catagory objCatagory)
        {
            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            //if (objCatagory.Id != 0)
            //{
                foreach (string file in Request.Files)
                {

                    var fileContent = Request.Files[file];
                    if (fileContent != null && fileContent.ContentLength > 0)
                    {
                        var inputStream = fileContent.InputStream;
                        var fileName = fileContent.FileName;
                        string path = (Path.Combine(Server.MapPath("~/CatagoryImage"), fileName));
                        fileContent.SaveAs(path);
                        objCatagory.CatagoryImage = fileName;

                    }
                }
                objContext.Catagories.Add(objCatagory);
                objContext.SaveChanges();
            //}
            //else
            //{
            //    Catagory emp = objContext.Catagories.OrderByDescending(q => q.Id).FirstOrDefault();
            //}
            return Json(null);
        }
        public JsonResult DeleteCatagory(int CatagoryID)
        {

            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            Catagory ObjDeleteCatagory = objContext.Catagories.First(i => i.Id == CatagoryID);
            objContext.Catagories.Remove(ObjDeleteCatagory);
            objContext.SaveChanges();

            var CatagoryDetailList = (from emp in objContext.Catagories select new { emp.Id, emp.Name,emp.CatagoryImage}).ToList();
            return Json(CatagoryDetailList.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult selectCatagorydata(string CatagoryID)
        {
            int CataId = Convert.ToInt32(CatagoryID);
            DailyExpensiveEntities objContext = new DailyExpensiveEntities();
            var CatagoryList = (from Cata in objContext.Catagories where Cata.Id == CataId select new { Cata }).ToList();

            return Json(CatagoryList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EditModeFillCatagory(string CatagoryData)
        {


            string Url = "Catagory/Catagory";


            return Json(Url, JsonRequestBehavior.AllowGet);
        }
    }
}