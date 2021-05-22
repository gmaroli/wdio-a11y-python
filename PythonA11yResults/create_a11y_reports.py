import glob
import os
from datetime import datetime
import pandas as pd
from pretty_html_table import build_table

curr_date = datetime.today().strftime('%Y-%m-%d')

try:
    results_file_location = '../AutomationPracticeWebPage/results/a11y-results'
    os.chdir(results_file_location)

    # extension = 'csv'
    globbed_files = glob.glob("*.csv")  # creates a list of all csv files

    # Create empty Data frame
    df_detailed_report = pd.DataFrame([])

    for csvfile in globbed_files:
        df = pd.read_csv(csvfile)  # read the csv file into data frame
        # append the file name into data frame
        df['Page-FileName'] = os.path.basename(csvfile.split('_')[0])
        df_detailed_report = pd.concat([df_detailed_report, df])

    df_detailed_report = df_detailed_report.drop_duplicates()
    # detailed_html = df_detailed_report.to_html(justify="center", show_dimensions=True)
    html_table_blue_light = build_table(df_detailed_report, 'blue_light', font_size='small', font_family='Verdana')
    with open('A11y_PageDetailedReport.html', 'w') as f:
        f.write(html_table_blue_light)

    df_summary = df_detailed_report.groupby(['impact'])['impact'].count().reset_index(name="TotalViolations")
    df_summary['impact'] = pd.Categorical(df_summary['impact'], categories=['critical', 'serious', 'moderate', 'minor'], ordered=True)
    df_summary = df_summary.sort_values(by=['impact'], ascending=True).reset_index(drop=True)

    # df_with_filename = df_with_filename[['fileName','description','impact','html','failureSummary','id','help','helpUrl']]
    df_detailed_report = df_detailed_report.groupby(['Page-FileName', 'impact'])['impact'].count().reset_index(name="ViolationsCount")
    df_detailed_report['impact'] = pd.Categorical(df_detailed_report['impact'], categories=['critical', 'serious', 'moderate', 'minor'],
                                                  ordered=True)
    df_detailed_report = df_detailed_report.sort_values(by=['impact'], ascending=True).reset_index(drop=True)

    # Create Html file
    html = df_detailed_report.to_html(justify="center", show_dimensions=True)
    header1 = '''<html>
    <body>
        <h1 title="results-summary" style="border-bottom:2px solid black">Accessibility Test Result:{}</h1>
    </body>
</html>
'''.format(curr_date)

    header2a = '''<h2 title="summary">Summary</h2> '''
    header2b = '''<h2 title="detail">Breakdown by page</h2>'''
    html1 = df_summary.to_html(justify="center", show_dimensions=True)
    html = header1 + header2a + html1 + header2b + html
    # print(html)
    # write html to file

    with open("A11yResults.html", "w") as f:
        f.write(html)

    print("Accessibility Test result summary created- check artifacts")

except Exception as e:
    print("One or more error occurred while generating the report: {}".format(e))
