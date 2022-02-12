using Microsoft.AspNetCore.Mvc;
using ConvertCsvToJson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace SeriesTemporaisAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DatasController : ControllerBase
    {
        public static IWebHostEnvironment _environment;
        public DatasController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
     
        [HttpGet("get")]
        public Object Get()
        {
            var csv = new List<string[]>();
            var datas = System.IO.File.ReadAllLines(_environment.WebRootPath + "\\files\\" + "arquivo");

            foreach (string line in datas)
                csv.Add(line.Split(';'));

            var properties = datas[0].Split(';');

            var listObjResult = new List<Dictionary<string, string>>();

            for (int i = 1; i < datas.Length; i++)
            {
                var objResult = new Dictionary<string, string>();
                for (int j = 0; j < properties.Length; j++)
                    objResult.Add(properties[j], csv[i][j]);

                listObjResult.Add(objResult);
            }

            return JsonConvert.SerializeObject(listObjResult);
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(IFormFile file)
        {
            if (file != null && file.FileName.EndsWith(".csv"))
            {
                if (!Directory.Exists(_environment.WebRootPath + "\\files\\"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\files\\");
                }
                using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "\\files\\" + "arquivo"))
                {
                await file.CopyToAsync(filestream);
                filestream.Flush();
                return Ok(file.FileName);
                }
            }
            else {
                return BadRequest();
            }
        }
    }
}

