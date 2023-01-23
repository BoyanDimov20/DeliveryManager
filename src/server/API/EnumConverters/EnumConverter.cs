using Data.Enums;

namespace API.EnumConverters
{
    public static class EnumConverter
    {
        public static string GetDeliveryTypeName(DeliveryType deliveryType)
        {
            switch (deliveryType)
            {
                case DeliveryType.ToOffice:
                    return "До офис";
                case DeliveryType.ToAddress:
                    return "До адрес";
                case DeliveryType.ToAddressExpress:
                    return "До адрес (експресна)";
                default:
                    return "До адрес";
            }
        }

        public static string GetPackageStatusName(Status status)
        {
            switch (status)
            {
                case Status.Processing:
                    return "Обработва се";
                case Status.Waiting:
                    return "За доставка";
                case Status.Sent:
                    return "В куриер";
                case Status.Delivered:
                    return "Получена";
                default:
                    return "Обработва се";
            }
        }
    }
}
