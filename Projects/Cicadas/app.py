import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import plotly.express as px

# Assume df is your DataFrame containing the cicada data
# df = pd.read_csv('your_cicada_data.csv')

app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Slider(
        id='year-slider',
        min=df['Next emergence'].min(),
        max=df['Next emergence'].max(),
        value=df['Next emergence'].min(),
        marks={str(year): str(year) for year in df['Next emergence'].unique()},
        step=None
    ),
    dcc.Graph(id='geo-map')
])

@app.callback(
    Output('geo-map', 'figure'),
    [Input('year-slider', 'value')]
)
def update_map(selected_year):
    filtered_df = df[df['Next emergence'] == selected_year]
    # Note: You'll need to replace 'Longitude' and 'Latitude' with your actual coordinate columns
    fig = px.scatter_geo(filtered_df, lat='Latitude', lon='Longitude', scope='usa')
    return fig

if __name__ == '__main__':
    app.run_server(debug=True)
