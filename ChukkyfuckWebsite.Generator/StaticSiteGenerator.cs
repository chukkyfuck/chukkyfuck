namespace ChukkyfuckWebsite.Generator
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;
    using Razor.Templating.Core;
    using Serilog;

    internal class StaticSiteGeneratorOptions
    {
        public string TemplateAssemblyName { get; set; }

        public string StaticFilesDirectory { get; set; }

        public string OutputDirectory { get; set; }
    }

    internal class StaticSiteGenerator
    {
        private readonly StaticSiteGeneratorOptions options;

        public StaticSiteGenerator(StaticSiteGeneratorOptions options)
        {
            this.options = options ?? throw new ArgumentNullException(nameof(options));
        }

        public void Generate()
        {
            ClearOutputDirectory();
            CopyStaticFiles();
            RenderViews();
        }


        private void ClearOutputDirectory()
        {
            Log.Information($"Clearing output directory ({Path.GetFullPath(options.OutputDirectory)})");

            var directoryInfo = new DirectoryInfo(options.OutputDirectory);

            foreach (FileInfo file in directoryInfo.EnumerateFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo directory in directoryInfo.EnumerateDirectories())
            {
                directory.Delete(true);
            }

        }

        private void CopyStaticFiles()
        {
            string source = Path.GetFullPath(options.StaticFilesDirectory);
            string destination = Path.GetFullPath(options.OutputDirectory);

            Log.Information($"Copping static files to output directory ({destination})");

            foreach (string dirPath in Directory.EnumerateDirectories(source, "*", SearchOption.AllDirectories))
            {
                Directory.CreateDirectory(dirPath.Replace(source, destination));
            }
            
            foreach (string newPath in Directory.EnumerateFiles(source, "*.*", SearchOption.AllDirectories))
            {
                File.Copy(newPath, newPath.Replace(source, destination), false);
            }
        }

        private void RenderViews()
        {
            Log.Information($"Rendering views for assembly {options.TemplateAssemblyName}");

            Assembly assembly = Assembly.LoadFrom(options.TemplateAssemblyName);

            ICollection<string> views = assembly
                                             .GetExportedTypes()
                                             .Select(t => t.Name)
                                             .Where(n => !n.Contains("__"))
                                             .Where(n => n.StartsWith("Views_"))
                                             .ToList();


            foreach (string view in views)
            {
                using (FileStream stream = File.OpenWrite(Path.Combine(options.OutputDirectory, view.Substring(6).Replace('_', '\\') + ".html")))
                {
                    using (var writer = new StreamWriter(stream, Encoding.UTF8))
                    {
                        writer.Write(RazorTemplateEngine.RenderAsync(view.Replace('_', '/') + ".cshtml").Result);
                    }
                }
            }
        }
    }
}