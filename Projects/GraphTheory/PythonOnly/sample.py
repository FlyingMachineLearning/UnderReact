import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt

# Create a DataFrame manually for the sake of this example
# In practice, you would load this from a CSV file:
data = {
    'Person1': ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Gina', 'Hank', 'Ivy', 'Jack',
                'Karen', 'Lewis', 'Mona', 'Nick', 'Olive', 'Peter', 'Quincy', 'Rachel', 'Steve',
                'Tina', 'Uma', 'Vince', 'Wanda', 'Xander', 'Yara'],
    'Person2': ['Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Gina', 'Hank', 'Ivy', 'Jack', 'Karen',
                'Lewis', 'Mona', 'Nick', 'Olive', 'Peter', 'Quincy', 'Rachel', 'Steve', 'Tina',
                'Uma', 'Vince', 'Wanda', 'Xander', 'Yara', 'Zach']
}
df = pd.DataFrame(data)

# Create the graph from the DataFrame
G = nx.from_pandas_edgelist(df, 'Person1', 'Person2')

# Draw the graph
nx.draw(G, with_labels=True, node_color='lightblue', font_size=10, font_weight='bold', node_size=500, font_color='darkred')
plt.title('Social Network Graph')
plt.show()
