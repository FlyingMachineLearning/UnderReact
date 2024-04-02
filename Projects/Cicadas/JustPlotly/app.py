import plotly.graph_objs as go
from plotly.subplots import make_subplots

# Unique years to be used as slider steps
years = df['Year'].unique()
years.sort()

# Creating a figure with Plotly
fig = make_subplots(rows=1, cols=1, subplot_titles=('Cicada Brood Emergence by State',))

# Adding a choropleth trace for each year
for year in years:
    fig.add_trace(
        go.Choropleth(
            locations=df[df['Year'] == year]['State'],  # State names
            z=[1]*len(df[df['Year'] == year]),  # Dummy data to fill the state
            locationmode='USA-states',
            colorscale='Reds',
            showscale=False,  # Hide color scale
            name=str(year),  # Name each trace with the corresponding year
            visible=(year == years[0])  # Only the first year is visible initially
        )
    )

# Updating the layout to include a slider
steps = []
for i, year in enumerate(years):
    step = dict(
        method='update',
        args=[{'visible': [False] * len(years)},  # Hide all traces
              {'title.text': f'Cicada Brood Emergence in {year}'}],  # Update the title for the selected year
        label=str(year)
    )
    step['args'][0]['visible'][i] = True  # Toggle i-th trace to "visible"
    steps.append(step)

sliders = [dict(
    active=0,
    currentvalue={"prefix": "Year: "},
    pad={"t": 50},
    steps=steps
)]

fig.update_layout(
    sliders=sliders,
    geo=dict(scope='usa', projection=go.layout.geo.Projection(type='albers usa')),
    title=dict(text='Cicada Brood Emergence in ' + str(years[0]), x=0.5)
)

fig.show()
