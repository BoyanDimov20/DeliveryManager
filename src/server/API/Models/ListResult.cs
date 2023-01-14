namespace API.Models
{
    public class ListResult<T>
    {
        public Label[] Labels { get; set; }

        public T[] Data { get; set; }
    }

    public class Label
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
