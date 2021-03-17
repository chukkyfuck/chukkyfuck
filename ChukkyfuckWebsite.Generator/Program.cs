using System;

namespace ChukkyfuckWebsite.Generator
{
    using Serilog;

    class Program
    {
        static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                         .MinimumLevel.Information()
                         .WriteTo.Console()
                         .CreateLogger();

            try
            {
                var options = new StaticSiteGeneratorOptions
                {
                    TemplateAssemblyName = "ChukkyfuckWebsite.Template.Views.dll",
                    StaticFilesDirectory = @"wwwroot",
                    OutputDirectory = @"..\..\..\..\ChukkyfuckWebsite\"
                };

                var generator = new StaticSiteGenerator(options);
                generator.Generate();
            }
            catch (Exception exception)
            {
                Log.Fatal(exception, "An exception occurred while generating your website.");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}
